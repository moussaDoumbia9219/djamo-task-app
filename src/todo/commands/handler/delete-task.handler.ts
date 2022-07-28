import { CommandHandler, IQueryHandler } from '@nestjs/cqrs';
import { TodoRepository } from 'src/todo/repository/todo.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteTaskCommand } from '../impl/delete-task.command';

@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements IQueryHandler<DeleteTaskCommand> {
  constructor(
    @InjectRepository(TodoRepository) private todoRepository: TodoRepository,
  ) {}

  public async execute(request: DeleteTaskCommand): Promise<any> {
    return await this.todoRepository.delete({ id: request.id });
  }
}
