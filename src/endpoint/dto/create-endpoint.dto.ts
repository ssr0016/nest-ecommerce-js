import { IsEnum, IsNotEmpty } from 'class-validator';
import type { HttpMethod } from '../entities/endpoint.entity';

const httpmethod = ['GET', 'POST', 'PUT', 'DELETE'];

export class CreateEndpointDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @IsEnum(httpmethod)
  method: HttpMethod;
}
