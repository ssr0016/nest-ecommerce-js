import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { API_VERSION } from 'src/_cores/constants/app.constant';
import { AddToCartDto } from 'src/cart/dto/add-to-cart.dto';
import type { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { AuthGuard } from 'src/_cores/guards/auth.guard';
import { CurrentUser } from 'src/_cores/decorators/current-user.decorators';
import { TransformDTO } from 'src/_cores/interceptors/transfrom-dto.interceptors';
import { ResponseCartDto } from 'src/cart/dto/response-cart.dto';

@Controller(`${API_VERSION}/carts`)
@UseGuards(AuthGuard)
@TransformDTO(ResponseCartDto)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('/add-to-cart')
  addToCart(
    @Body() addToCartDto: AddToCartDto,
    @CurrentUser() user: UserPayload,
  ) {
    return this.cartService.addItemToCart(addToCartDto, user);
  }

  @Get('/me')
  getMyCart(@CurrentUser() user: UserPayload) {
    return this.cartService.findCart(user.id);
  }

  @Delete('/item/:cartItemId')
  deleteItemFromCart(@Param('cartItemId', ParseIntPipe) cartItemId: number) {
    return this.cartService.removeItemFromCart(cartItemId);
  }
}
