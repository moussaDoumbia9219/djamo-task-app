import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import * as typeOrmConfig from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MassiveModule } from '@nestjsplus/massive';

@Module({
  imports: [
    MassiveModule.register({
      user: process.env.POSTGRES_USERNAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: 5432,
      database: process.env.POSTGRES_DATABASE || 'djamotodo',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TodoModule,
  ],
})
export class AppModule {}
