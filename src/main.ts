import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // DELETE ALL ENDPOINTS (truncate)
  const dataSource = app.get(DataSource);

  try {
    // TRUNCATE sch.mytable RESTART IDENTITY CASCADE;
    dataSource.query('TRUNCATE endpoint RESTART IDENTITY CASCADE');
    console.log('truncate successfully!');
  } catch (error) {
    console.log('Failed to truncate table', error);
  }

  // GET ALL CURRENT ENDPOINTS -> 10 -> 100
  // INSERT TO DATABASE

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
