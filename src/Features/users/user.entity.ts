/* eslint-disable prettier/prettier */
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'tb_users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  passwordConfim: string;

  @Column()
  role: string | null;

  @Column()
  createdAt: Date = new Date();

  @Column()
  updatedAt: Date = new Date();
}
