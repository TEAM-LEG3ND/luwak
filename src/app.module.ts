import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './config/database.module';
import { PaymentModule } from './payment/payment.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './files/file-upload.module';
@Module({
  imports: [DatabaseModule, PaymentModule, AuthModule, UsersModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
