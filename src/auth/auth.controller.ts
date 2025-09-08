import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDTO } from './dto/sign-up-auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signUp(@Body() createAuthDto: SignUpAuthDTO) {
    return this.authService.create(createAuthDto);
  }

  @Post()
  signIn(@Body() createAuthDto: SignUpAuthDTO) {
    return this.authService.create(createAuthDto);
  }
}
