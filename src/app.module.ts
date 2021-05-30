import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import * as typeOrmConfig from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MassiveModule } from '@nestjsplus/massive';

@Module({
  imports: [
    MassiveModule.register({
      user: process.env.POSTGRES_USERNAME || 'opzchgufhbrphp',
      password:
        process.env.POSTGRES_PASSWORD ||
        '842579378d06638ff42bffafd069ab22fe5aa233be4d53cbc74dc089570a8ba0',
      host:
        process.env.POSTGRES_HOST ||
        'ec2-23-23-128-222.compute-1.amazonaws.com',
      port: 5432,
      database: process.env.POSTGRES_DATABASE || 'df71n0m8v06anb',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TodoModule,
  ],
})
export class AppModule {}
