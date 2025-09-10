import { ApiProperty } from '@nestjs/swagger';

export class SignInAuthDTO {
  @ApiProperty({ default: 'admingmail.com' })
  email: string;

  @ApiProperty({ default: '123456' })
  password: string;
}
