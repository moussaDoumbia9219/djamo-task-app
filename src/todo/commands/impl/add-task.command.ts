import { TodoDto } from '../../dto/todo.dto';

export class AddTaskCommand {
  constructor(public todoDto: TodoDto) {}
}
