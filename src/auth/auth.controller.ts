import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDTO } from './dto/sign-up-auth.dto';
import { SignInAuthDTO } from 'src/auth/dto/sign-in-auth.dto';
import { API_VERSION } from 'src/_cores/constants/app.constant';

@Controller(`${API_VERSION}/auth`)
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
  @HttpCode(200)
  async signIn(@Body() signInAuthDTO: SignInAuthDTO) {
    const accessToken = await this.authService.signIn(signInAuthDTO);

    return {
      message: 'Sign in successfully',
      data: accessToken,
    };
  }
}
