import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoDto } from '../dto/todo.dto';
import { Todo } from '../entity/todo.entity';
import { TodoRepository } from '../repository/todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository)
    private todoRepository: TodoRepository,
  ) {}

  async getAllTodo(): Promise<Todo[]> {
    return this.todoRepository.getAllTodo();
  }

  async createTodo(todoDto: TodoDto): Promise<Todo> {
    console.log('todo service: ', this.todoRepository);
    return this.todoRepository.createTodo(todoDto);
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id: id } });

    if (!todo) {
      throw new NotFoundException(`This ${id} is not found`);
    }
    return todo;
  }

  async updateTodoById(id: number, todoDto: TodoDto) {
    const todo = await this.getTodoById(id);
    todo.title = todoDto.title;
    todo.description = todoDto.description;

    await todo.save();
    return todo;
  }

  async deleteTodoById(id: number): Promise<string> {
    const todo = await this.todoRepository.delete({ id });

    if (todo.affected === 0) {
      throw new NotFoundException(`This ${id} is not found`);
    }

    return 'todo deleted';
  }
}
