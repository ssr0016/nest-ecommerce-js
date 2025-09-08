import { Request } from 'express';
import { UserPayload } from 'src/user/interfaces/user-payload.interface';
declare global {
  namespace Express {
    interface Request {
      currentUser: UserPayload;
    }
  }
}
