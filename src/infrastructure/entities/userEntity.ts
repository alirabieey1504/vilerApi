// infrastructure/entities/UserEntity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  phoneNumber!: string;

  @Column()
  role!: string;
}
