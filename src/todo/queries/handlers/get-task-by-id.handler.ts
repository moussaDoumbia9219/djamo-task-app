import { TodoRepository } from './../../repository/todo.repository';
import { GetTaskByIdQuery } from './../impl/get-task-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entity/todo.entity';

@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
  constructor(
    @InjectRepository(TodoRepository)
    private readonly todoRepository: TodoRepository,
  ) {}

  public async execute(query: GetTaskByIdQuery): Promise<Todo> {
    return await this.todoRepository.findOne({ where: { id: query.id } });
  }
}
