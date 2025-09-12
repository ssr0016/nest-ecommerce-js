import { Expose, Type } from 'class-transformer';
import { Category } from 'src/category/entities/category.entity';

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
  children: Category[];
}
