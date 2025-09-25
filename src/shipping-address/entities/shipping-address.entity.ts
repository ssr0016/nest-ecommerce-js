import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  value: string; // 123 New york

  @Column({ type: 'varchar', length: 13 })
  phoneNumber: string;

  @ManyToOne(() => User, (user) => user.shippingAddressess)
  user: User;
}
