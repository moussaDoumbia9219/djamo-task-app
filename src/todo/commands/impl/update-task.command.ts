import { TodoDto } from '../../dto/todo.dto';

export class UpdateTaskCommand {
  constructor(public id: number, public todoDto: TodoDto) {}
}
