import { AddTaskCommand } from './../impl/add-task.command';
import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todo/repository/todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entity/todo.entity';

@CommandHandler(AddTaskCommand)
export class AddTaskHandler implements IQueryHandler<AddTaskCommand> {
  constructor(
    @InjectRepository(TodoRepository) private todoRepository: TodoRepository,
  ) {}

  public async execute(request: AddTaskCommand): Promise<Todo> {
    return await this.todoRepository.createTodo(request.todoDto);
  }
}
