import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './services/todo.service';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodo(): Promise<Todo[]> {
    return this.todoService.getAllTodo();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTodo(@Body() todoDto: TodoDto): Promise<Todo> {
    return this.todoService.createTodo(todoDto);
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getTodoById(id);
  }

  @Patch('/:id')
  updateTodoById(
    @Param('id', ParseIntPipe) id: number,
    @Body() todoDto: TodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodoById(id, todoDto);
  }

  @Delete('/:id')
  deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.todoService.deleteTodoById(id);
  }
}
