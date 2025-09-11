import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { getAllRoutes } from 'src/_utils/app.util';
import { Endpoint, HttpMethod } from './endpoint/entities/endpoint.entity';
import { Role } from 'src/role/entities/role.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export let globalApp: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  globalApp = app;
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('eCommerce API')
    .setDescription('The eCommerce API description')
    .setVersion('1.0')
    .addTag('eCommerce')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);

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
      .where('role.deletedDate IS NULL')
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
            isAllow: role.name === 'admin' ? true : false,
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
