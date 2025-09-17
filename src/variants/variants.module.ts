import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Variant } from 'src/variants/entities/variant.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Variant]), ProductModule],
  controllers: [VariantsController],
  providers: [VariantsService],
})
export class VariantsModule {}
