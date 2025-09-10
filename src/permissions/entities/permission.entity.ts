import { Endpoint } from 'src/endpoint/entities/endpoint.entity';
import { Role } from 'src/role/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Permission {
  @PrimaryColumn()
  roleName: string;

  @PrimaryColumn()
  endpointId: number;

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: 'roleName' })
  role: Role;

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: 'endpointId' })
  endpoint: Endpoint;

  @Column()
  isAllow: boolean;
}
