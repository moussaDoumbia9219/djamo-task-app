import { EntityRepository, Repository } from 'typeorm';
import { TodoDto } from '../dto/todo.dto';
import { Todo } from '../entity/todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(todoDto: TodoDto): Promise<Todo> {
    const { title, description } = todoDto;

    const todo = new Todo();
    todo.title = title;
    todo.description = description;

    await todo.save();

    return todo;
  }

  async getAllTodo(): Promise<Todo[]> {
    const query = this.createQueryBuilder('todo');

    const todos = await query.getMany();

    return todos;
  }
}
