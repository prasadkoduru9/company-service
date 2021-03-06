import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createdocument } from './swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import { databaseConfiguration } from './config/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, createdocument(app));
  await app.listen(databaseConfiguration.APP_PORT);
}
bootstrap();
