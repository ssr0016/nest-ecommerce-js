import { ApiProperty } from '@nestjs/swagger';

export class SignInAuthDTO {
  @ApiProperty({ default: 'admin@gmail.com' })
  email: string;

  @ApiProperty({ default: '123456' })
  password: string;
}
