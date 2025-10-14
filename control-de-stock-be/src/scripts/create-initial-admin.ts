// src/scripts/create-initial-admin.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { Usuario } from '../entities/usuario.entity'; 
import { Ciudad } from '../entities/ciudad.entity';
import { Provincia } from '../entities/provincia.entity';
import { Pais } from '../entities/pais.entity';

const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5433'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Usuario, Ciudad, Provincia, Pais],
    synchronize: false,
    logging: false,
});


async function createInitialAdmin() {
  console.log('Iniciando script para crear usuario administrador inicial...');
  try {
    await dataSource.initialize();
    console.log('Conexión a la base de datos establecida.');

    const usuarioRepository = dataSource.getRepository(Usuario); 
    const ciudadRepository = dataSource.getRepository(Ciudad);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@kiosco.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

    const existingAdmin = await usuarioRepository.findOne({
      where: { email: adminEmail },
      select: ['idUsuario'] as (keyof Usuario)[]
    });

    if (existingAdmin) {
      console.log(`El usuario administrador con email '${adminEmail}' ya existe (ID: ${existingAdmin.idUsuario}).`);
      await dataSource.destroy();
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    let idCiudad: number | null = null;
    let ciudad: Ciudad | null = null;
    try {
      const [firstCity] = await ciudadRepository.find({ take: 1223 });
      
      if (firstCity) {
        idCiudad = firstCity.idCiudad; 
        ciudad = firstCity;
        console.log(`Asignando la primera ciudad encontrada (ID: ${idCiudad}) al administrador.`);
      } else {
        console.log('No se encontraron ciudades. El administrador NO SE PUEDE crear por restricción NOT NULL.');
        await dataSource.destroy();
        return;
      }
    } catch (cityError) {
      console.warn('Error al buscar ciudad, el administrador NO SE CREARÁ:', cityError instanceof Error ? cityError.message : String(cityError));
      await dataSource.destroy();
      return;
    }

    const newAdmin = usuarioRepository.create({
    nombre: 'Super',
    apellido: 'Admin',
    email: adminEmail,
    contraseña: hashedPassword,
    ciudad: ciudad, 
    });

    await usuarioRepository.save(newAdmin);
    console.log(`Usuario administrador '${adminEmail}' creado exitosamente con ID: ${newAdmin.idUsuario}`);

  } catch (error) {
    console.error('Error al crear el usuario administrador inicial:', error instanceof Error ? error.message : error);
    if (error instanceof Error && error.stack) {
      console.error(error.stack);
    }
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
      console.log('Conexión a la base de datos cerrada.');
    }
  }
}

createInitialAdmin();