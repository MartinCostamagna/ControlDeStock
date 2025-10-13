// src/database/data-seeding/data-seeding.module.ts
import { Module, Logger } from '@nestjs/common';
import { DataSeedingService } from './data-seeding.service';
import { DataSeedingController } from './data-seeding.controller';
import { ConfigModule } from '@nestjs/config';
import { PaisModule } from '../../pais/pais.module';
import { ProvinciaModule } from '../../provincia/provincia.module';
import { CiudadModule } from '../../ciudad/ciudad.module'; 
import { GeorefModule } from '../../georef/georef.module'; 

@Module({
  imports: [
    ConfigModule,
    PaisModule,
    ProvinciaModule,
    CiudadModule,
    GeorefModule,
  ],
  controllers: [DataSeedingController],
  providers: [DataSeedingService],
  exports: [DataSeedingService],
})
export class DataSeedingModule {}