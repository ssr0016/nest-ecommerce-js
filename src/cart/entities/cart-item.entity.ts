import { Cart } from 'src/cart/entities/cart.entity';
import { Product } from 'src/product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 6, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'text' })
  variant: string; // {size: 'XL', color: 'red'}

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Cart)
  cart: Cart;
}
