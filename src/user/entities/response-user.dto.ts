import { Expose, Transform } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';

export class ResponseUserDto {
  @Expose()
  id: number;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }: { obj: User }) => obj.role.name)
  role: string;
}
