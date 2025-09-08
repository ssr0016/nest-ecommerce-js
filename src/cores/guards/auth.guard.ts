import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // Extract JWT in bearer token header
    const token = request.headers?.authorization?.split(' ')[1];
    if (!token) return false;

    // Verify JWT => Payload
    try {
      const currentUser = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET_KEY'),
      });

      request.currentUser = currentUser;

      return true;
    } catch {
      return false;
    }
  }
}
