import { Expose, Type } from 'class-transformer';

export class ResponseCategoryDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  slug: string;

  @Expose()
  @Type(() => ResponseCategoryDto)
  children: ResponseCategoryDto[];
}
