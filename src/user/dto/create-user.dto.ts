import { IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'fake.username' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ default: 'fake.lastname' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ default: 'fake.@email.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'fake.password' })
  @IsNotEmpty()
  @Length(6)
  password: string;

  role: string;
}
