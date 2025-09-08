import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDTO } from './dto/sign-up-auth.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() signUpAuthDTO: SignUpAuthDTO) {
    const accessToken = await this.authService.signUp(signUpAuthDTO);

    return {
      message: 'Sign up successfully',
      data: accessToken,
    };
  }

  @Post('/sign-in')
  signIn(@Body() signInAuthDTO: SignUpAuthDTO) {
    return this.authService.signIn(signInAuthDTO);
  }
}
