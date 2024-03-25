import {NestFactory} from '@nestjs/core';
import {initSwaggerConfig} from './config/swagger-config';
import {AppModule} from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwaggerConfig(app);
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  });
  await app.listen(3000);
}

bootstrap();
