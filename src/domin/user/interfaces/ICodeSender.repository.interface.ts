export interface ICodeSenderRepository {
  sendToSms(phone: string, kode: number): Promise<any[]>;
}
