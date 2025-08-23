import { ISaveCodeRepository } from 'src/domin/user/interfaces/ISaveCode.repository.interface';
import type { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
export class verifyCodeRepository implements ISaveCodeRepository {
  constructor(
    @Inject('CACHE_MANAGER')
    private CacheManager: Cache,
  ) {}
  async saveCode(code: number): Promise<void> {
    console.log(code, 'this is my code');
    await this.CacheManager.set('code', code);
  }
}
