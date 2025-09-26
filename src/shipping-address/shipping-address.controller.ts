import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ShippingAddressService } from './shipping-address.service';
import { CreateShippingAddressDto } from './dto/create-shipping-address.dto';
import { UpdateShippingAddressDto } from './dto/update-shipping-address.dto';
import { API_VERSION } from 'src/_cores/constants/app.constant';
import { CurrentUser } from 'src/_cores/decorators/current-user.decorators';
import type { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { AuthGuard } from 'src/_cores/guards/auth.guard';
import { TransformDTO } from 'src/_cores/interceptors/transfrom-dto.interceptors';
import { ResponseShippingAddressDto } from 'src/shipping-address/dto/response-shipping-address.dto';

@Controller(`${API_VERSION}/shipping-address`)
@UseGuards(AuthGuard)
@TransformDTO(ResponseShippingAddressDto)
export class ShippingAddressController {
  constructor(
    private readonly shippingAddressService: ShippingAddressService,
  ) {}

  @Post()
  create(
    @Body() createShippingAddressDto: CreateShippingAddressDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.shippingAddressService.create(createShippingAddressDto, user);
  }

  @Get()
  findAll() {
    return this.shippingAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shippingAddressService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShippingAddressDto: UpdateShippingAddressDto,
  ) {
    return this.shippingAddressService.update(+id, updateShippingAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shippingAddressService.remove(+id);
  }
}
