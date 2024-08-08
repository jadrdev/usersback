/* eslint-disable prettier/prettier */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @Column({ default: '' })
  imageUrl: string; // URL de una imagen del producto, si es necesario

  @Column()
  createdAt: Date = new Date();

  @Column()
  updatedAt: Date = new Date();
}
