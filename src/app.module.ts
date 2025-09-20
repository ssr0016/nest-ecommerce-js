import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from 'src/user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { Role } from 'src/role/entities/role.entity';
import { EndpointModule } from './endpoint/endpoint.module';
import { Endpoint } from 'src/endpoint/entities/endpoint.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { Permission } from 'src/permissions/entities/permission.entity';
import { CategoryModule } from './category/category.module';
import { Category } from 'src/category/entities/category.entity';
import { ProductModule } from './product/product.module';
import { Product } from 'src/product/entities/product.entity';
import { UploadModule } from './upload/upload.module';
import { ProductGalleriesModule } from './product-galleries/product-galleries.module';
import { ProductGallery } from 'src/product-galleries/entities/product-gallery.entity';
import { VariantsModule } from './variants/variants.module';
import { Variant } from 'src/variants/entities/variant.entity';
import { VariantItemsModule } from './variant-items/variant-items.module';
import { VariantItem } from 'src/variant-items/entities/variant-item.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cart/entities/cart-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [
          User,
          Role,
          Endpoint,
          Permission,
          Category,
          Product,
          ProductGallery,
          Variant,
          VariantItem,
          Cart,
          CartItem,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    RoleModule,
    EndpointModule,
    PermissionsModule,
    CategoryModule,
    ProductModule,
    UploadModule,
    ProductGalleriesModule,
    VariantsModule,
    VariantItemsModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
