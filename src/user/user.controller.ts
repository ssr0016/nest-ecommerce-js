import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/_cores/guards/auth.guard';
import { CurrentUser } from 'src/_cores/decorators/current-user.decorators';
import type { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { API_VERSION } from 'src/_cores/constants/app.constant';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TransformDTO } from 'src/_cores/interceptors/transfrom-dto.interceptors';
import { ResponseUserDto } from 'src/user/entities/response-user.dto';

@Controller(`${API_VERSION}/users`)
@TransformDTO(ResponseUserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  getCurrentUser(@CurrentUser() user: UserPayload) {
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
