import { ISaveCodeRepository } from 'src/domin/user/interfaces/ISaveCode.repository.interface';
import type { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
export class verifyCodeRepository implements ISaveCodeRepository {
  constructor(
    @Inject('CACHE_MANAGER')
    private CacheManager: Cache,
  ) {}
  async saveCode(): Promise<void> {}
}
