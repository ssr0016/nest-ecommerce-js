import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
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

  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
