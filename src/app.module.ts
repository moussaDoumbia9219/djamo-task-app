import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import * as typeOrmConfig from './typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TodoModule],
})
export class AppModule {}
