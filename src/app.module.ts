import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { microservices } from './microservices.import';
import { CommonModule } from './common/common.module';
import { UserController } from 'user/user.controller';
import { ProxyService } from 'proxy';

const importModules = [...microservices, CommonModule];
@Module({
  imports: importModules,
  controllers: [AppController, UserController],
  providers: [AppService, ProxyService],
})
export class AppModule {}
