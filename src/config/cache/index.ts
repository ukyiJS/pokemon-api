import { Injectable, CacheOptionsFactory, CacheModuleOptions } from '@nestjs/common';

@Injectable()
export class CacheService implements CacheOptionsFactory {
  public createCacheOptions = (): CacheModuleOptions => ({ ttl: 5, max: 10 });
}
