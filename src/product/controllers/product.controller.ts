import { Body, Controller, Get, Param, Put, Post, Delete } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity"
import { ProductCreateDTO } from "../services/dto/create-product.dto";
import { ProductUpdateDTO } from "../services/dto/update-product.dto";

@Controller('products')
export class ProductController{
    constructor (private readonly productService: ProductService){}

    @Post('/createProduct')
    async create (@Body() productCreateDTO: ProductCreateDTO): Promise<Product> {
        return this.productService.createProduct(productCreateDTO);
    }
    
    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get('/productById/:id')
    async findOne(@Param('id') id_produk: string): Promise<ProductCreateDTO | null> {
        return this.productService.findOne(id_produk);
    }

    @Put('/editProduct/:id_produk')
    async updateProduct(@Param('id_produk') id_produk:string, @Body() updateData: ProductUpdateDTO) {
        return this.productService.updateProduct(id_produk, updateData);
    }

    @Delete('/deleteProduct/:id')
    async deleteProduct(@Param('id') id_produk:string){
        return this.productService.deleteProduct(id_produk)
    }
}