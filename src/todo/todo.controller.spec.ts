import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './services/todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoRepository } from './repository/todo.repository';
import * as request from 'supertest';
import { TodoDto } from './dto/todo.dto';

describe('TodoController', () => {
  let app: INestApplication;
  let controller: TodoController;
  let service: TodoService;
  let firstTodo;
  const newTodo: TodoDto = {
    title: 'testNameTodo',
    description: 'lorem ipsum dolor itset',
  };

  const testData: TodoDto = {
    title: 'updatetitle',
    description: 'update texttlorem ipsum dolor itset',
  };
  const endpointUrl = '/todo';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([TodoRepository]),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST || 'localhost',
          port: +process.env.POSTGRES_PORT || 5432,
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          database: process.env.POSTGRES_DB || 'djamotodo',
          entities: [
            __dirname + '/**/*.entity.ts',
            __dirname + '/**/*.entity.js',
          ],
          keepConnectionAlive: true,
          migrationsRun: false,
          logging: true,
          migrationsTableName: 'migration',
          migrations: [
            __dirname + '/migration/**/*.ts',
            __dirname + '/migration/**/*.js',
          ],
          synchronize: false,
          cli: {
            migrationsDir: 'src/migration',
          },
        }),
      ],
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should define service', () => {
    expect(service).toBeDefined();
  });
  it(`Get ${endpointUrl}`, async () => {
    const response = await request(app.getHttpServer()).get(endpointUrl);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].description).toBeDefined();
    firstTodo = response.body[0];
  });

  it(`GET by id in ${endpointUrl}/:todoId`, async () => {
    const response = await request(app.getHttpServer()).get(
      `${endpointUrl}/${firstTodo.id}`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.description).toBe(firstTodo.description);
  });

  it(`GET todoById doesnt exist in ${endpointUrl}`, async () => {
    const response = await request(app.getHttpServer()).get(
      `${endpointUrl}/` + 1231241341414124214124124,
    );

    expect(response.statusCode).toBe(404);
  });

  it(`should create resource at ${endpointUrl}`, async () => {
    const response = await request(app.getHttpServer())
      .post(endpointUrl)
      .send(newTodo);
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.description).toBe(newTodo.description);
  });

  it(`should return error 500 on malformed data on POST ${endpointUrl}`, async () => {
    const response = await request(app.getHttpServer())
      .post(endpointUrl)
      .send({ title: 'Missing description property' });

    expect(response.statusCode).toBe(400);
  });

  it(`PUT ${endpointUrl}`, async () => {
    const response = await request(app.getHttpServer())
      .patch(`${endpointUrl}/${firstTodo.id}`)
      .send(testData);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(testData.title);
    expect(response.body.description).toBe(testData.description);
  });
  it(`DELETE ${endpointUrl}`, async () => {
    const response = await request(app.getHttpServer()).delete(
      `${endpointUrl}/${firstTodo.id}`,
    );

    expect(response.text).toBe('todo deleted');

    const secondResponse = await request(app.getHttpServer()).delete(
      `${endpointUrl}/${firstTodo.id}`,
    );

    expect(secondResponse.statusCode).toBe(404);
  });
});
