import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class UploadService {
  constructor(private productService: ProductService) {}

  async upload(type: string, entityId: number, file: Express.Multer.File) {
    if (type === 'products') {
      const product = await this.productService.findOne(entityId);

      product.image = file.filename;
      console.log(file.filename);
      await this.productService.save(product);
    }
  }
}
