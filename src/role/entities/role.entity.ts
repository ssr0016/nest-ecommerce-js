import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn()
  name: string;

  @Column()
  description: string;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];
}
