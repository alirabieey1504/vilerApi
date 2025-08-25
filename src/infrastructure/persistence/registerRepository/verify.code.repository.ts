import { ISaveCodeRepository } from 'src/domin/user/interfaces/ISaveCode.repository.interface';
import type { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
Injectable();
export class VerifyCodeRepository implements ISaveCodeRepository {
  constructor(
    @Inject('REDIS_CLIENT')
    private redis: Redis,
  ) {}
  async saveCode(phoneNumber: string, code: number): Promise<void> {
    console.log(code, 'this is my code');
    console.log(phoneNumber, 'this is phone');
    await this.redis.set(`code:${phoneNumber}`, code);
    const thisss = await this.redis.get(`code:${phoneNumber}`);
    console.log(thisss, 'this is sss5234');
  }
  async verifyUser(phoneNumber: string, InputCode: number): Promise<boolean> {
    console.log(phoneNumber, InputCode);
    const result = await this.redis.get(`code:${phoneNumber}`);
    console.log(result, 'this is fff');

    return true;
  }
}
