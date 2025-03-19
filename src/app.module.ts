import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/user/entities/user.entity';
import { Product } from './product/entities/product.entity';
import { UserController } from './auth/user/controllers/user.controller';
import { UserService } from './auth/user/services/user.service';
import { dataSourceOptions } from './config/database.config';
import { ProductController } from './product/controllers/product.controller';
import { ProductService } from './product/services/product.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([User, Product])
  ],
  controllers: [UserController, ProductController],
  providers: [UserService, ProductService],
})
export class AppModule {}
