import { Injectable } from '@nestjs/common';
import { CreateVariantItemDto } from './dto/create-variant-item.dto';
import { UpdateVariantItemDto } from './dto/update-variant-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VariantItem } from 'src/variant-items/entities/variant-item.entity';
import { VariantsService } from 'src/variants/variants.service';

@Injectable()
export class VariantItemsService {
  constructor(
    @InjectRepository(VariantItem)
    private variantRepository: Repository<VariantItem>,
    private variantService: VariantsService,
  ) {}

  async create(createVariantItemDto: CreateVariantItemDto) {
    const variant = await this.variantService.findOne(
      createVariantItemDto.variantId,
    );

    const variantItem = new VariantItem();
    variantItem.variant = variant;

    Object.assign(variantItem, createVariantItemDto);
    return this.variantRepository.save(variantItem);
  }

  findAll() {
    return `This action returns all variantItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} variantItem`;
  }

  update(id: number, updateVariantItemDto: UpdateVariantItemDto) {
    return `This action updates a #${id} variantItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} variantItem`;
  }
}
