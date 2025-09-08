import { PartialType } from '@nestjs/mapped-types';
import { SignUpAuthDTO } from './sign-up-auth.dto';

export class SignInAuthDTO extends PartialType(SignUpAuthDTO) {}
