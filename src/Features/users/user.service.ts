/* eslint-disable prettier/prettier */
// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as crypto from 'crypto-js';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    // Consulta personalizada para obtener el usuario actualizado
    const updatedUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();

    if (!updatedUser) {
      throw new Error(
        `No se pudo encontrar el usuario actualizado con ID ${id}`,
      );
    }

    return updatedUser;
  }

  async create(user: User): Promise<User> {
    // Genera un hash de la contraseña utilizando PBKDF2
    const hashedPassword = crypto
      .PBKDF2(user.password, 'salt', { keySize: 512 / 32, iterations: 1000 })
      .toString();

    // Reemplaza la contraseña del usuario con el hash generado
    user.password = hashedPassword;

    // Guarda el usuario en la base de datos
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
