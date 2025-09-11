import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleDto {
  @ApiProperty({ default: 'update.fake.admin' })
  @IsNotEmpty()
  @Length(5)
  description: string;
}
