// src/database/data-seeding/data-seeding.service.ts
import { Injectable, Logger, ConflictException, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaisService } from '../../pais/pais.service';
import { ProvinciaService } from '../../provincia/provincia.service';
import { CiudadService } from '../../ciudad/ciudad.service';
import { GeorefService } from '../../georef/georef.service';
import { GeorefProvincia, GeorefMunicipio } from '../../interfaces/georef.interfaces';
import { CreatePaisDto } from '../../dto/create-pais.dto';
import { CreateProvinciaDto } from '../../dto/create-provincia.dto';
import { CreateCiudadDto } from '../../dto/create-ciudad.dto';
import { Pais } from '../../entities/pais.entity';
import { Provincia } from '../../entities/provincia.entity';
import { Ciudad } from '../../entities/ciudad.entity';


@Injectable()
export class DataSeedingService implements OnModuleInit {
 private readonly logger = new Logger(DataSeedingService.name);

 constructor(
  private readonly paisesService: PaisService, 
  private readonly provinciasService: ProvinciaService, 
  private readonly ciudadesService: CiudadService, 
  private readonly georefService: GeorefService,
  private readonly configService: ConfigService,
 ) {}
  
 async onModuleInit() { 
    const runSeeding = this.configService.get<string>('RUN_SEEDING') === 'true';
    if (runSeeding) {
    this.logger.log('Iniciando siembra de datos desde Georef API...');
      await this.seedDatabase();
      this.logger.log('Siembra de datos completada.');
    } else {
      this.logger.log('Siembra de datos omitida (RUN_SEEDING no es "true").');
    }
  }

 async seedDatabase() {
    this.logger.log('Verificando/Creando país Argentina...');
  let argentinaCountry: Pais | null = null;
  try {
   const result = await this.paisesService.findOneByName('Argentina', false, true);
   if (result) {
    argentinaCountry = result as Pais;
   }

   if (!argentinaCountry) {
    const countryDto: CreatePaisDto = { nombre: 'Argentina'};
    const createdResult = await this.paisesService.create(countryDto);
    argentinaCountry = createdResult as Pais;
    this.logger.log(`País '${argentinaCountry.nombre}' creado ID: ${argentinaCountry.idPais}`);
   } else {
    this.logger.log(`País '${argentinaCountry.nombre}' ya existe ID: ${argentinaCountry.idPais}`);
   }
  } catch (error) {
   if (error instanceof NotFoundException) {
     this.logger.log("País Argentina no encontrado, creando...");
     const countryDto: CreatePaisDto = { nombre: 'Argentina'};
     const createdResult = await this.paisesService.create(countryDto);
     argentinaCountry = createdResult as Pais; 
     this.logger.log(`País '${argentinaCountry.nombre}' creado ID: ${argentinaCountry.idPais}`);
   } else if (error instanceof ConflictException) {
     this.logger.warn(`Conflicto al crear Argentina: ${error.message}. Intentando obtenerlo...`);
     const foundResult = await this.paisesService.findOneByName('Argentina', false, true);
     if (foundResult) {
      argentinaCountry = foundResult as Pais; 
     }
   } else {
     this.logger.error('Error al procesar país Argentina:', error instanceof Error ? error.stack : String(error));
     return;
   }
  }
  if (!argentinaCountry) {
    this.logger.error('No se pudo obtener/crear país Argentina. Deteniendo siembra.');
    return;
  }

  const georefProvinceIdToLocalDataMap = new Map<string, { localId: number, name: string }>();
  this.logger.log('Sembrando provincias desde Georef API...');
  try {
   const georefProvinces: GeorefProvincia[] = await this.georefService.getProvincias();
   this.logger.log(`Obtenidas ${georefProvinces.length} provincias de Georef.`);
   for (const georefProv of georefProvinces) {
    if (!georefProv.centroide || typeof georefProv.centroide.lat !== 'number' || typeof georefProv.centroide.lon !== 'number') {
      this.logger.warn(`Provincia '${georefProv.nombre}' (Georef ID: ${georefProv.id}) sin coordenadas válidas. Omitiendo.`);
      continue;
    }
    try {
      const provinceDto: CreateProvinciaDto = { 
        nombre: georefProv.nombre,
        idPais: argentinaCountry.idPais,
        latitud: georefProv.centroide.lat, 
        longitud: georefProv.centroide.lon,
      };

      const processedProvince = await this.provinciasService.create(provinceDto) as Provincia;
      this.logger.log(`Provincia procesada: '${processedProvince.nombre}', ID local: ${processedProvince.idProvincia}, Lat: ${processedProvince.latitud}, Lon: ${processedProvince.longitud} (Georef ID: ${georefProv.id})`);
      georefProvinceIdToLocalDataMap.set(georefProv.id, { localId: processedProvince.idProvincia, name: processedProvince.nombre });
    } catch (error) {
      if (!(error instanceof ConflictException)) {
        this.logger.error(`Error al procesar provincia '${georefProv.nombre}' (Georef ID: ${georefProv.id}):`, error instanceof Error ? error.message : String(error));
      } else {
  
        const existingProv = await this.provinciasService.findOneByNameAndPaisId(georefProv.nombre, argentinaCountry.idPais, false, true) as Provincia;
        if (existingProv) {
          this.logger.log(`Provincia '${georefProv.nombre}' ya existía, ID local: ${existingProv.idProvincia}`);
          georefProvinceIdToLocalDataMap.set(georefProv.id, { localId: existingProv.idProvincia, name: existingProv.nombre });
        } else {
          this.logger.error(`No se pudo obtener la provincia '${georefProv.nombre}' después de un conflicto.`);
        }
      }
    }
   }
  } catch (error) {
   this.logger.error('Error obteniendo provincias de Georef:', error instanceof Error ? error.stack : String(error));
  }

  this.logger.log('Sembrando ciudades (municipios) desde Georef API...');
  let citiesAttempted = 0, citiesProcessed = 0, citiesSkipped = 0, citiesFailed = 0;
  try {
   const georefMunicipios: GeorefMunicipio[] = await this.georefService.getMunicipios();
   this.logger.log(`Obtenidos ${georefMunicipios.length} municipios de Georef.`);
   for (const georefMuni of georefMunicipios) {
    citiesAttempted++;
    const provinceData = georefProvinceIdToLocalDataMap.get(georefMuni.provincia.id);
    if (!provinceData) {
     this.logger.warn(`Provincia local no encontrada para municipio '${georefMuni.nombre}' (Prov. Georef ID: ${georefMuni.provincia.id}). Omitiendo.`);
     citiesSkipped++;
     continue;
    }
    if (!georefMuni.centroide || typeof georefMuni.centroide.lat !== 'number' || typeof georefMuni.centroide.lon !== 'number') {
      this.logger.warn(`Municipio '${georefMuni.nombre}' (Georef ID: ${georefMuni.id}) sin coordenadas válidas. Omitiendo.`);
      citiesSkipped++;
      continue;
    }
    try {
     const cityDto: CreateCiudadDto = {
      nombre: georefMuni.nombre,
      idProvincia: provinceData.localId,
      latitud: georefMuni.centroide.lat,
      longitud: georefMuni.centroide.lon,
     };
     const processedCity = await this.ciudadesService.create(cityDto) as Ciudad;
     this.logger.log(`Ciudad procesada: '${processedCity.nombre}', ID local: ${processedCity.idCiudad}`);
     citiesProcessed++;
    } catch (error) {
      if (!(error instanceof ConflictException)){
        this.logger.error(`Error al procesar ciudad '${georefMuni.nombre}' (Georef ID: ${georefMuni.id}):`, error instanceof Error ? error.message : String(error));
        citiesFailed++;
      } else {
  
        const existingCity = await this.ciudadesService.findOneByNameAndProvinceId(georefMuni.nombre, provinceData.localId, false, true) as Ciudad;
        if(existingCity) {
          this.logger.log(`Ciudad '${georefMuni.nombre}' ya existía, ID local: ${existingCity.idCiudad}`);
          citiesProcessed++;
        } else {
          this.logger.error(`No se pudo obtener la ciudad '${georefMuni.nombre}' después de un conflicto.`);
          citiesFailed++;
        }
      }
    }
   }
  } catch (error) {
   this.logger.error('Error obteniendo municipios de Georef:', error instanceof Error ? error.stack : String(error));
  } finally {
    this.logger.log(`Resumen Siembra Ciudades: Intentadas=${citiesAttempted}, Procesadas=${citiesProcessed}, Omitidas=${citiesSkipped}, Fallidas=${citiesFailed}`);
  }
 }
}