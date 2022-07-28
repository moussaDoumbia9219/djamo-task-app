import { UpdateTaskCommand } from './commands/impl/update-task.command';
import { AddTaskCommand } from './commands/impl/add-task.command';
import { GetTaskByIdQuery } from './queries/impl/get-task-by-id.query';
import { ListTasksQuery } from './queries/impl/list-tasks.query';
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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { TodoDto } from './dto/todo.dto';
import { Todo } from './entity/todo.entity';
import { TodoService } from './services/todo.service';
import { DeleteTaskCommand } from './commands/impl/delete-task.command';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(
    private todoService: TodoService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  async getAllTodo(): Promise<Todo[]> {
    return await this.queryBus.execute(new ListTasksQuery());
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTodo(@Body() todoDto: TodoDto): Promise<Todo> {
    return await this.commandBus.execute(new AddTaskCommand(todoDto));
  }

  @Get('/:id')
  async getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return await this.queryBus.execute(new GetTaskByIdQuery(id));
  }

  @Patch('/:id')
  async updateTodoById(
    @Param('id', ParseIntPipe) id: number,
    @Body() todoDto: TodoDto,
  ): Promise<Todo> {
    return await this.commandBus.execute(new UpdateTaskCommand(id, todoDto));
  }

  @Delete('/:id')
  async deleteTodoById(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return await this.commandBus.execute(new DeleteTaskCommand(id));
  }
}
