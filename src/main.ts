import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config'

async function bootstrap() {
  console.log('environment: ' + process.env.PORT)
  const app = await NestFactory.create(AppModule);
  
  app.enableCors(); 
  app.useGlobalPipes(new ValidationPipe()) 
  await app.listen(process.env.PORT);
}
bootstrap();
