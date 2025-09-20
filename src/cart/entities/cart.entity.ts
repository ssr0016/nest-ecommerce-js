import { CartItem } from 'src/cart/entities/cart-item.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  // bi-directional
  @OneToMany(() => CartItem, (item) => item.cart)
  items: CartItem[];
}
