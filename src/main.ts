import {NestFactory} from '@nestjs/core';
import {initSwaggerConfig} from './config/swagger-config';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwaggerConfig(app);
  app.enableCors({
    origin: '*',
    methods: 'POST, GET, PUT, PATCH, DELETED, OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Origin, Authorization'
  });
  await app.listen(3000);
}

bootstrap();
