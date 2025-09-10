import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpAuthDTO } from './dto/sign-up-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { generateToken } from 'src/_utils/token.util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpAuthDTO: SignUpAuthDTO) {
    // 1) Create user
    // 2) Hash password
    const user = await this.userService.create(signUpAuthDTO);
    // 3) Save it to Database

    // 4) Generate JWT token
    return generateToken(user, this.jwtService);
  }

  async signIn(signInAuthDTO: SignUpAuthDTO) {
    // 1) Find user by user's email
    const user = await this.userService.findByEmail(signInAuthDTO.email);

    if (!user) throw new BadRequestException('Bad Credentials');

    // 2) Compare password
    const isMatch = await bcrypt.compare(signInAuthDTO.password, user.password);

    if (!isMatch) throw new BadRequestException('Bad Credentials');

    // 3) Issue access token
    return generateToken(user, this.jwtService);
  }
}
