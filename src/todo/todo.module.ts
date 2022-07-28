import { UpdateTaskHandler } from './commands/handler/update-task.handler';
import { AddTaskHandler } from './commands/handler/add-task.handler';
import { GetTaskByIdHandler } from './queries/handlers/get-task-by-id.handler';
import { ListTasksHandler } from './queries/handlers/list-tasks.handler';
import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './repository/todo.repository';
import { TodoService } from './services/todo.service';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteTaskHandler } from './commands/handler/delete-task.handler';

@Module({
  imports: [TypeOrmModule.forFeature([TodoRepository]), CqrsModule],
  controllers: [TodoController],
  providers: [
    TodoService,
    ListTasksHandler,
    GetTaskByIdHandler,
    AddTaskHandler,
    UpdateTaskHandler,
    DeleteTaskHandler,
  ],
})
export class TodoModule {}
