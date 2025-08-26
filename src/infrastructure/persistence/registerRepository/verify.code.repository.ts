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
    await this.redis.set(`code:${phoneNumber}`, code, 'EX', 120);
  }
  async verifyCode(phoneNumber: string, InputCode: number): Promise<boolean> {
    const getCode = await this.redis.get(`code:${phoneNumber}`);
    const toNumGetCode = Number(getCode);
    if (toNumGetCode === InputCode) {
      return true;
    } else {
      return false;
    }
  }
  async getTtl(phoneNumber: string): Promise<boolean> {
    const getTtl = await this.redis.ttl(`code:${phoneNumber}`);
    if (getTtl == -2) return false;
    else return true;
  }
}
