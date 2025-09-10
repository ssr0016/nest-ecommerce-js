import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class AllowPermissionDto {
  @IsNotEmpty()
  roleName: string;

  @IsNotEmpty()
  @IsNumber()
  endpointId: number;

  @IsNotEmpty()
  @IsBoolean()
  isAllow: boolean;
}
