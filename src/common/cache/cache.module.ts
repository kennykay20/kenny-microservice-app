import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => ({}),
    } as CacheModuleAsyncOptions),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheConfigModule {}
