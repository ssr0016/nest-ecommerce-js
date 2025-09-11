import { IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @ApiProperty({ default: 'fake.admin' })
  @IsNotEmpty()
  @Matches(/^[\w-]+$/, {
    message:
      'Role name can only contain letters, numbers, underscores, and hyphens',
  })
  name: string;

  @ApiProperty({ default: 'fake admin role' })
  @IsNotEmpty()
  @Length(5)
  description: string;
}
