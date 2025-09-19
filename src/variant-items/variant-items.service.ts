import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateVariantItemDto } from './dto/create-variant-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VariantItem } from 'src/variant-items/entities/variant-item.entity';
import { VariantsService } from 'src/variants/variants.service';

@Injectable()
export class VariantItemsService {
  constructor(
    @InjectRepository(VariantItem)
    private variantItemsRepository: Repository<VariantItem>,
    private variantService: VariantsService,
  ) {}

  async create(createVariantItemDto: CreateVariantItemDto) {
    const variant = await this.variantService.findOne(
      createVariantItemDto.variantId,
    );

    const variantItem = new VariantItem();
    variantItem.variant = variant;

    Object.assign(variantItem, createVariantItemDto);
    return this.variantItemsRepository.save(variantItem);
  }

  async findAll(variantId: number) {
    const variant = await this.variantService.findOne(variantId);

    return this.variantItemsRepository.find({
      where: { variant },
    });
  }

  async findOne(id: number) {
    const variantItems = await this.variantItemsRepository.findOne({
      where: { id },
    });

    if (!variantItems) throw new BadRequestException(`No variant ${id} found`);

    return variantItems;
  }

  async remove(id: number) {
    const variantItem = await this.findOne(id);

    await this.variantItemsRepository.remove(variantItem);
  }
}
