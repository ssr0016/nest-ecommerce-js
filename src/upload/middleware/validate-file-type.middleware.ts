import {
  BadRequestException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// It checks if the type is in the allowed types ['products', 'users']
@Injectable()
export class ValidateFileTypeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const allowedFileType = ['products', 'users'];
    const { type } = req.params;

    if (!allowedFileType.includes(type))
      throw new BadRequestException(
        `Type ${type} is not in [${allowedFileType.join(', ')}]`,
      );

    next();
  }
}
