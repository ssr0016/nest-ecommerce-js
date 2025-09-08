import { Injectable } from '@nestjs/common';
import { SignUpAuthDTO } from './dto/sign-up-auth.dto';
import { SignInAuthDTO } from './dto/sign-in-auth.dto';

@Injectable()
export class AuthService {
  create(createAuthDto: SignUpAuthDTO) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: SignInAuthDTO) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
