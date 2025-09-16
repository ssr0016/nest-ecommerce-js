import { Controller, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductGalleriesService } from './product-galleries.service';
import { API_VERSION } from 'src/_cores/constants/app.constant';

@Controller(`${API_VERSION}/product-galleries`)
export class ProductGalleriesController {
  constructor(
    private readonly productGalleriesService: ProductGalleriesService,
  ) {}

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    this.productGalleriesService.remove(id);

    return { message: 'success' };
  }
}
