import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/_cores/guards/auth.guard';
import { CurrentUser } from 'src/_cores/decorators/current-user.decorators';
import type { UserPayload } from 'src/user/interfaces/user-payload.interface';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  getCurrentUser(@CurrentUser() user: UserPayload) {
    return user;
  }
}
