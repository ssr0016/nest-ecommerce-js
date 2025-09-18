import { Module } from '@nestjs/common';
import { VariantItemsService } from './variant-items.service';
import { VariantItemsController } from './variant-items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantItem } from 'src/variant-items/entities/variant-item.entity';
import { VariantsModule } from 'src/variants/variants.module';

@Module({
  imports: [TypeOrmModule.forFeature([VariantItem]), VariantsModule],
  controllers: [VariantItemsController],
  providers: [VariantItemsService],
})
export class VariantItemsModule {}
