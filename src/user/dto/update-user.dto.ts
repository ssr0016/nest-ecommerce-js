import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ default: 'fake.username' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ default: 'fake.lastname' })
  @IsOptional()
  @IsString()
  lastName: string;
}
