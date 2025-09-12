import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateCategoryDto {
  @ApiProperty({ default: 'fake.category' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ default: 'fake.description' })
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsOptional()
  parentId: number;
}
