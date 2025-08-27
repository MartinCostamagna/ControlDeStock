import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CiudadResolver } from './ciudad/ciudad.resolver';
import { ProvinciaResolver } from './provincia/provincia.resolver';
import { PaisResolver } from './pais/pais.resolver';
import { CiudadModule } from './ciudad/ciudad.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { PaisModule } from './pais/pais.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [CiudadModule, ProvinciaModule, PaisModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService, CiudadResolver, ProvinciaResolver, PaisResolver],
})
export class AppModule {}
