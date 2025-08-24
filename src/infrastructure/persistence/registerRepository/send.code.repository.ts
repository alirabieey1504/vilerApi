import { DataSource } from 'typeorm';
import Kavenegar from 'kavenegar';
import { ICodeSenderRepository } from 'src/domin/user/interfaces/ICodeSender.repository.interface';

export class SendCodeRepository implements ICodeSenderRepository {
  constructor(private readonly dataSource: DataSource) {}
  apiKey =
    '3045716F37754F496C707A486A344477734F6457694772664E587A7A5054764A733654384E4D71513271383D'; // کلید API خودت
  sender = '1000300030030';
  api = Kavenegar.KavenegarApi({ apikey: this.apiKey });
  async sendToSms(phone: string, code: number): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.api.Send(
        {
          sender: this.sender,
          receptor: phone,
          message: String(code),
        },
        (response, status) => {
          console.log(status, 'this is status');

          if (status !== 200) {
            reject(new Error(`SMS API failed: ${status}`));
            return;
          }

          if (Array.isArray(response)) {
            resolve(response);
          } else {
            reject(new Error('Response is not an array'));
          }
        },
      );
    });
  }
}
