// infrastructure/entities/UserEntity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  role!: string;
}
