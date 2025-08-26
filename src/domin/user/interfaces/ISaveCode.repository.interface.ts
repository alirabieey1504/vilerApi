export interface ISaveCodeRepository {
  saveCode(phoneNumber: string, code: number): Promise<void>;
  verifyCode(phoneNumber: string, InputCode: number): Promise<boolean>;
  getTtl(phoneNumber: string): Promise<boolean>;
}
