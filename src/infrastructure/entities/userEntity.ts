// infrastructure/entities/UserEntity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  phoneNumber!: string;

  @Column()
  role!: string;
}
