/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './Features/users/users.module';
import { ProductModule } from './Features/products/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shop_fl_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Sincroniza automáticamente el esquema de la base de datos (solo para desarrollo)
    }),
    UsersModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
