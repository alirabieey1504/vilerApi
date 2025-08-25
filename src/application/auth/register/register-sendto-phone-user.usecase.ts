// //منطق ثبت نام کاربر
// import type { IUserRepository } from '../../../domin/user/user.repository.interface';
// import { User, UserRole } from '../../../domin/user/user.entity';
// import { Injectable, Inject } from '@nestjs/common';
// import { v4 as uuidv4 } from 'uuid';

// @Injectable()
// export class RegisterUserUseCase {
//   constructor(
//     @Inject('IUserRepository')
//     private readonly userRepo: IUserRepository,
//   ) {}

//   async execute(phoneNumber: string): Promise<object> {
//     const id: string = uuidv4();
//     const randomCode = Math.random() * 1000000;
//     const code = Number(String(randomCode).slice(0, 5));
//     const user = new User(id, phoneNumber, UserRole.PASSENGER);

//     console.log(user, 'this is my user');
//     const result = await this.userRepo.save(user);
//     const result2 = await this.userRepo.sendToSms(phoneNumber, code);
//     console.log(result2, 'this is result2');
//     return {
//       res: result,
//       code: result2,
//     };
//   }
// }
