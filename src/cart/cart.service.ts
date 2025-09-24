import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from 'src/cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/cart/entities/cart-item.entity';
import { User } from 'src/user/entities/user.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { ProductService } from 'src/product/product.service';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
import { VariantItemsService } from 'src/variant-items/variant-items.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    private productService: ProductService,
    private variantItemsService: VariantItemsService,
  ) {}
  create(user: User) {
    const cart = new Cart();
    cart.user = user;
    return this.cartRepository.save(cart);
  }

  async findCart(userId: number) {
    const cart = await this.cartRepository.findOne({
      where: { user: { id: userId } },
      relations: { items: true },
    });

    console.log(cart);

    if (!cart) throw new NotFoundException('No cart found for this user');

    return cart;
  }

  async addItemToCart(addToCartDto: AddToCartDto, currentUser: UserPayload) {
    const { quantity, variantItemId, productId } = addToCartDto;

    const product = await this.productService.findOne(productId);
    const variantItem = await this.variantItemsService.findOne(variantItemId);

    const variant = {
      itemId: variantItem.id,
      variant: variantItem.variant.name,
      value: variantItem.value,
      price: variantItem.price,
    };

    const totalPrice =
      product.price * quantity + parseFloat(`${variant.price}`) * quantity;

    const cartItemExisting = await this.cartItemRepository.findOne({
      where: {
        product,
      },
    });

    if (
      cartItemExisting &&
      JSON.parse(cartItemExisting.variant).itemId === variant.itemId
    ) {
      cartItemExisting.quantity = cartItemExisting.quantity + quantity;
      cartItemExisting.totalPrice =
        cartItemExisting.quantity *
        (product.price + parseFloat(`${variant.price}`));
      await this.cartItemRepository.save(cartItemExisting);
      return;
    }

    const cartItem = new CartItem();
    cartItem.product = product;
    cartItem.cart = await this.findCart(currentUser.id);
    cartItem.price = product.price;
    cartItem.quantity = quantity;
    cartItem.variant = JSON.stringify(variant);
    cartItem.totalPrice = totalPrice;

    await this.cartItemRepository.save(cartItem);
  }

  async findOneCartItem(cartItemId: number) {
    const cartItem = await this.cartItemRepository.findOne({
      where: { id: cartItemId },
    });

    if (!cartItem)
      throw new NotFoundException(`Cart item: ${cartItemId} not found`);

    return cartItem;
  }

  async removeItemFromCart(cartIteId: number) {
    const cartItem = await this.findOneCartItem(cartIteId);

    await this.cartItemRepository.remove(cartItem);
  }
}
