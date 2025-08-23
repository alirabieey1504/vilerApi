export interface ISaveCodeRepository {
  saveCode(code: number): Promise<void>;
}
