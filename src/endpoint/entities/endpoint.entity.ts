import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

enum HttpEndPoint {
  GET,
  POST,
  PATCH,
  DELETE,
}

@Entity()
export class Endpoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  method: HttpEndPoint;
}
