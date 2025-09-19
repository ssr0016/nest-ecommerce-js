import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ default: 'fake.username' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ default: 'fake.lastname' })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  lastName: string;
}
