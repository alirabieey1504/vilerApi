import { ISaveCodeRepository } from 'src/domin/user/interfaces/ISaveCode.repository.interface';
import type { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
export class VerifyCodeRepository implements ISaveCodeRepository {
  constructor(
    @Inject('CACHE_MANAGER')
    private CacheManager: Cache,
  ) {}
  async saveCode(phoneNumber: string, code: number): Promise<void> {
    console.log(code, 'this is my code');
    await this.CacheManager.set(`otp:${phoneNumber}`, code, 120);
    const tess = await this.CacheManager.get(`otp:${phoneNumber}`);
    console.log(tess, 'this is sss5234');
  }
  async verifyUser(phoneNumber: string, InputCode: number): Promise<boolean> {
    console.log(phoneNumber, InputCode);
    const result = await this.CacheManager.get<number>(`otp:${phoneNumber}`);

    console.log(result, 'this is fff');
    return true;
  }
}
