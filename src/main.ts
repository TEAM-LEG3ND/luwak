import { NestFactory } from '@nestjs/core';
import { initSwaggerConfig } from './config/swagger-config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwaggerConfig(app);
  app.enableCors(/*{
    origin: 'https://luwak.server.d0lim.com/',
    methods: 'POST',
    allowedHeaders: 'Content-Type, Accept, Origin, Authorization'
  }*/);
  await app.listen(3000);
}
bootstrap();
