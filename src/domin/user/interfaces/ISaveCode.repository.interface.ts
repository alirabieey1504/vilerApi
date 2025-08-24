export interface ISaveCodeRepository {
  saveCode(phoneNumber: string, code: number): Promise<void>;
  verifyUser(phoneNumber: string, InputCode: number): Promise<boolean>;
}
