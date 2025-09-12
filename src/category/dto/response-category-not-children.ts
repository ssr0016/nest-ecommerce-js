import { Expose } from 'class-transformer';

export class ResponseCategoryNotChildrenDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  slug: string;
}
