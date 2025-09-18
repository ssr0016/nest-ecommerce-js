import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VariantItemsService } from './variant-items.service';
import { CreateVariantItemDto } from './dto/create-variant-item.dto';
import { UpdateVariantItemDto } from './dto/update-variant-item.dto';
import { API_VERSION } from 'src/_cores/constants/app.constant';
import { TransformDTO } from 'src/_cores/interceptors/transfrom-dto.interceptors';
import { ResponseVariantItemsDto } from 'src/variant-items/dto/response-variant-items.dto';

@Controller(`${API_VERSION}/variant-items`)
@TransformDTO(ResponseVariantItemsDto)
export class VariantItemsController {
  constructor(private readonly variantItemsService: VariantItemsService) {}

  @Post()
  create(@Body() createVariantItemDto: CreateVariantItemDto) {
    return this.variantItemsService.create(createVariantItemDto);
  }

  @Get()
  findAll() {
    return this.variantItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.variantItemsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVariantItemDto: UpdateVariantItemDto,
  ) {
    return this.variantItemsService.update(+id, updateVariantItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.variantItemsService.remove(+id);
  }
}
