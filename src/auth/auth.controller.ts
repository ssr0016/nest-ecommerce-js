import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDTO } from './dto/sign-up-auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signUp(@Body() createAuthDto: SignUpAuthDTO) {
    const accessToken = await this.authService.signUp(createAuthDto);

    return {
      message: 'Sign up successfully',
      data: accessToken,
    };
  }

  @Post()
  signIn(@Body() createAuthDto: SignUpAuthDTO) {
    // return this.authService.signUp(createAuthDto);
  }
}
