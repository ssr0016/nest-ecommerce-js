import { Injectable } from '@nestjs/common';
import { UpdateProductGalleryDto } from './dto/update-product-gallery.dto';
import { ProductGallery } from 'src/product-galleries/entities/product-gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ProductGalleriesService {
  constructor(
    @InjectRepository(ProductGallery)
    private galleryRepository: Repository<ProductGallery>,
  ) {}

  create(image: string, product: Product) {
    const gallery = new ProductGallery();

    gallery.image = image;
    gallery.product = product;

    return this.galleryRepository.save(gallery);
  }

  findAll() {
    return `This action returns all productGalleries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productGallery`;
  }

  update(id: number, updateProductGalleryDto: UpdateProductGalleryDto) {
    return `This action updates a #${id} productGallery`;
  }

  remove(id: number) {
    return `This action removes a #${id} productGallery`;
  }
}
