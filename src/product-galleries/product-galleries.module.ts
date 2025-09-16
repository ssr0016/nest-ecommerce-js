import { Module } from '@nestjs/common';
import { ProductGalleriesService } from './product-galleries.service';
import { ProductGalleriesController } from './product-galleries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGallery } from 'src/product-galleries/entities/product-gallery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductGallery])],
  controllers: [ProductGalleriesController],
  providers: [ProductGalleriesService],
  exports: [ProductGalleriesService],
})
export class ProductGalleriesModule {}
