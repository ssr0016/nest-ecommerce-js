import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from 'src/role/role.module';
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    CartModule,
    JwtModule,
    ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
