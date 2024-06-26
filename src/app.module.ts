/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Features/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_naruro_shirt',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Sincroniza automáticamente el esquema de la base de datos (solo para desarrollo)
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
