import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getAllRoutes } from 'src/utils/app.util';
import { Endpoint, HttpMethod } from './endpoint/entities/endpoint.entity';

export let globalApp: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  globalApp = app;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);

  const allRoutes = getAllRoutes(app);

  const dataSource = app.get(DataSource);
  const queryRunner = dataSource.createQueryRunner();

  try {
    queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.query('TRUNCATE endpoint RESTART IDENTITY CASCADE');

    console.log('Truncate successfully!');

    for (const route of allRoutes.routes) {
      const [method, url] = route.split(' ');

      queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Endpoint)
        .values({
          url,
          method: method as HttpMethod,
        })
        .execute();
    }

    await queryRunner.commitTransaction();
    console.log('Insert successfully into database!');
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.log('Failed to truncate table', error);
  } finally {
    await queryRunner.release();
  }
}
bootstrap();
