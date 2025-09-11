import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AllowPermissionDto {
  @ApiProperty({ default: 'fake.admin' })
  @IsNotEmpty()
  roleName: string;

  @ApiProperty({ default: 1 })
  @IsNotEmpty()
  @IsNumber()
  endpointId: number;

  @ApiProperty({ default: true })
  @IsNotEmpty()
  @IsBoolean()
  isAllow: boolean;
}
