import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from 'src/_cores/guards/auth.guard';
import { CurrentUser } from 'src/_cores/decorators/current-user.decorators';
import type { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { API_VERSION } from 'src/_cores/constants/app.constant';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TransformDTO } from 'src/_cores/interceptors/transfrom-dto.interceptors';
import { ResponseUserDto } from 'src/user/entities/response-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { ChangePwdUserDto } from 'src/user/dto/change-pwd-user.dto';

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

  @Post('/change-password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access-token')
  changePassword(
    @Body() changePwdUserDto: ChangePwdUserDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.userService.changePassword(changePwdUserDto, user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
