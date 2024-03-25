import {NestFactory} from '@nestjs/core';
import {initSwaggerConfig} from './config/swagger-config';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwaggerConfig(app);
  app.enableCors({
    origin: '*',
    methods: 'HEAD,POST,GET,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Origin, Authorization'
  });
  await app.listen(3000);
}

bootstrap();
