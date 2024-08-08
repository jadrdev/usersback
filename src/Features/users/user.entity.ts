/* eslint-disable prettier/prettier */
// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Role } from '../roles/roles.entity';

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

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @Column()
  createdAt: Date = new Date();

  @Column()
  updatedAt: Date = new Date();
}
