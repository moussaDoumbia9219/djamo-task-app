import { TodoService } from './../../services/todo.service';
import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todo/repository/todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entity/todo.entity';
import { UpdateTaskCommand } from '../impl/update-task.command';

@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements IQueryHandler<UpdateTaskCommand> {
  constructor(private todoService: TodoService) {}

  public async execute(request: UpdateTaskCommand): Promise<Todo> {
    return await this.todoService.updateTodoById(request.id, request.todoDto);
  }
}
