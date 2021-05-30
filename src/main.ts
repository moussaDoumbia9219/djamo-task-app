import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.APP_PORT || 3000;

  const options = new DocumentBuilder()
    .setTitle('Djamo Tasks API')
    .setDescription('Simple api made for djamo technical tests')
    .setVersion('1.0')
    .addTag('djamoTasks')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
