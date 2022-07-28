import { TodoRepository } from './../../repository/todo.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ListTasksQuery } from '../impl/list-tasks.query';

@QueryHandler(ListTasksQuery)
export class ListTasksHandler implements IQueryHandler<ListTasksQuery> {
  constructor(
    @InjectRepository(TodoRepository) private todoRepository: TodoRepository,
  ) {}
  async execute(query: ListTasksQuery): Promise<any> {
    return await this.todoRepository.getAllTodo();
  }
}
