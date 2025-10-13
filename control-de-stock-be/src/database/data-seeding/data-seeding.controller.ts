// src/database/data-seeding/data-seeding.controller.ts (CORREGIDO)
import { Controller, Post, Body, HttpCode, HttpStatus, Logger, UnauthorizedException } from '@nestjs/common';
import { DataSeedingService } from './data-seeding.service';
import { TriggerSeedingDto } from './dto/trigger-seeding.dto';
import { ConfigService } from '@nestjs/config';

@Controller('seed')
export class DataSeedingController {
  private readonly logger = new Logger(DataSeedingController.name);

  constructor(
    private readonly dataSeedingService: DataSeedingService,
    private readonly configService: ConfigService,
  ) {}

  @Post('trigger')
  @HttpCode(HttpStatus.OK)
  async triggerManualSeeding(@Body() triggerSeedingDto: TriggerSeedingDto): Promise<{ message: string }> {
    this.logger.log('Intento de disparo manual de siembra de datos.');

    const seedingSecret = this.configService.get<string>('SEEDING_ADMIN_PASSWORD_SECRET');

    if (!seedingSecret) {
      this.logger.error('Error de configuración: SEEDING_ADMIN_PASSWORD_SECRET no está definida en el entorno.');
      throw new UnauthorizedException('Configuración de seguridad de siembra incompleta. Contacte al administrador.');
    }

    if (triggerSeedingDto.adminPassword !== seedingSecret) {
      this.logger.warn('Intento fallido de siembra manual: Contraseña especial incorrecta.');
      throw new UnauthorizedException('Contraseña especial de administrador incorrecta.');
    }

    this.logger.log('Contraseña especial correcta. Disparando la siembra manual de la base de datos.');
    try {
      await this.dataSeedingService.seedDatabase(); 
      this.logger.log('Siembra manual de datos completada con éxito.');
      return { message: 'La siembra manual de datos ha sido disparada y completada con éxito.' };
    } catch (error: any) {
      this.logger.error(`Error durante la siembra manual: ${error.message}`, error.stack);
      throw new Error(`Error al ejecutar la siembra manual: ${error.message}`);
    }
  }
}