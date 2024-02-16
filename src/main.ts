import { NestFactory } from '@nestjs/core';
import { initSwaggerConfig } from './config/swagger-config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initSwaggerConfig(app);
  await app.listen(3000);
}
bootstrap();
