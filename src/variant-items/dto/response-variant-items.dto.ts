import { Expose } from 'class-transformer';

export class ResponseVariantItemsDto {
  @Expose()
  id: number;

  @Expose()
  value: string;

  @Expose()
  variantId: number;
}
