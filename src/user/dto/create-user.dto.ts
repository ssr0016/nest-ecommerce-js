import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'fake.username' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ default: 'fake.lastname' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ default: 'fake.@email.com' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ default: 'fake.password' })
  @IsNotEmpty()
  @Length(6)
  @IsString()
  password: string;

  @IsString()
  role: string;
}
