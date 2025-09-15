import { Expose, Transform } from 'class-transformer';
import { Product } from 'src/product/entities/product.entity';

export class ResponseProductDto {
  @Expose()
  id: number;
  @Expose()
  name: string;

  @Expose()
  price: number;

  @Expose()
  offerPrice: number;

  @Expose()
  shortDescription: string;

  @Expose()
  longDescription: string;

  @Expose()
  quantity: number;

  @Expose()
  slug: string;

  @Expose()
  categoryId: number;

  @Transform(({ obj }: { obj: Product }) => obj?.category?.name)
  @Expose()
  category: string;
}
