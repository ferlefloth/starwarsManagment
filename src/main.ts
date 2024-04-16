import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Habilitar CORS
  app.useGlobalPipes(new ValidationPipe()) // validación para que , por api, me conteste lo que rompe
  await app.listen(3000);
}
bootstrap();
