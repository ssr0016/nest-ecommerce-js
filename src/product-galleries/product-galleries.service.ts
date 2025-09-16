import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductGallery } from 'src/product-galleries/entities/product-gallery.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import fs from 'node:fs/promises';
import path from 'node:path';

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

  async findOne(id: number) {
    const gallery = await this.galleryRepository.findOne({
      where: { id },
    });

    if (!gallery) throw new NotFoundException(`Gallery image ${id} not found`);

    return gallery;
  }

  async remove(id: number) {
    const gallery = await this.findOne(id);
    const imagePath = path.join(
      __dirname,
      '..',
      '..',
      'uploads',
      'products',
      gallery.image,
    );
    await fs.unlink(imagePath);
    this.galleryRepository.remove(gallery);
  }
}
