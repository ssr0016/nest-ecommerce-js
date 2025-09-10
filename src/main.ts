import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getAllRoutes } from 'src/utils/app.util';
import { Endpoint, HttpMethod } from './endpoint/entities/endpoint.entity';
import { Role } from 'src/role/entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

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

    // DELETE ALL ROUTES
    await queryRunner.query('TRUNCATE endpoint RESTART IDENTITY CASCADE');

    // DELETE ALL PERMISSIONS
    await queryRunner.query('TRUNCATE permission RESTART IDENTITY CASCADE');

    console.log('Truncate successfully!');

    // ADD ROUTES
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

    // ADD ROLES
    const roles = await queryRunner.manager
      .getRepository(Role)
      .createQueryBuilder('role')
      .where('role.isActive = :isActive', { isActive: true })
      .getMany();

    // console.log(roles);

    const endpoints = await queryRunner.manager
      .getRepository(Endpoint)
      .createQueryBuilder('endpoint')
      .getMany();

    for (const role of roles) {
      // Loop get all endpoints
      for (const endpoint of endpoints) {
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Permission)
          .values({
            endpointId: endpoint.id,
            roleName: role.name,
          })
          .execute();
      }
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
