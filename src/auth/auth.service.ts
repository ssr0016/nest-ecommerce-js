import { Injectable } from '@nestjs/common';
import { SignUpAuthDTO } from './dto/sign-up-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(createAuthDto: SignUpAuthDTO) {
    // 1) Create user
    // 2) Hash password
    const user = await this.userService.create(createAuthDto);
    // 3) Save it to Database
    // 4) Generate JWT token
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isActive: user.isActive,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
