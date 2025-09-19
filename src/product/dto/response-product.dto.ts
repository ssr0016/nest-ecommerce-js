import { Expose, Transform, Type } from 'class-transformer';
import { Product } from 'src/product/entities/product.entity';
import { ResponseVariantItemsDto } from 'src/variant-items/dto/response-variant-items.dto';

export class ResponseVariantDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  productId: number;

  @Expose()
  @Type(() => ResponseVariantItemsDto)
  items: ResponseVariantItemsDto[];
}

export class ResponseProductDto {
  @Expose()
  id: number;
  @Expose()
  name: string;

  @Expose()
  image: string;

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

  @Expose()
  @Type(() => ResponseVariantDto)
  variants: ResponseVariantDto[];
}
