import { IsEnum, IsNotEmpty } from 'class-validator';
import type { HttpMethod } from '../entities/endpoint.entity';
import { ApiProperty } from '@nestjs/swagger';

const httpmethod = ['GET', 'POST', 'PUT', 'DELETE'];

export class CreateEndpointDto {
  @ApiProperty({ default: 'http://localhost:3000' })
  @IsNotEmpty()
  url: string;

  @ApiProperty({ default: 'GET | POST | PUT | DELETE' })
  @IsNotEmpty()
  @IsEnum(httpmethod)
  method: HttpMethod;
}
