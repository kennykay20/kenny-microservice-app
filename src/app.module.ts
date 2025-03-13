import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { microservices } from './microservices.import';
import { CommonModule } from './common/common.module';

const importModules = [...microservices, CommonModule];
@Module({
  imports: importModules,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
