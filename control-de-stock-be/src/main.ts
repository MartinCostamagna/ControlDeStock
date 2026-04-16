import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomJwtAuthGuard } from './auth/guards/custom-jwt-auth.guard';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200', 
    credentials: true,
  });
  app.use(require('cookie-parser')());
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new CustomJwtAuthGuard(reflector));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
