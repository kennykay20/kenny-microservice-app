import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async save(key: string, data: string, ttl?: number) {
    return this.cacheManager.set(key, data, ttl);
  }

  async get(key: string) {
    return this.cacheManager.get<string>(key);
  }

  async clear() {
    return this.cacheManager.clear();
  }

  async remove(key: string) {
    return this.cacheManager.del(key);
  }
}
