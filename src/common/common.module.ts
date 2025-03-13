import { Module } from '@nestjs/common';
import { CacheConfigModule } from './cache/cache.module';

@Module({
  imports: [CacheConfigModule],
  exports: [CacheConfigModule],
})
export class CommonModule {}
