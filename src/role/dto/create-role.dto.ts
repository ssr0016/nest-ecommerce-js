import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @ApiProperty({ default: 'fake.admin' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 'fake admin role' })
  @IsNotEmpty()
  @Length(5)
  description: string;
}
