import { Body, Controller, Get, Param, Put, Post, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity"
import { CreateProductDto } from "../services/dto/create-product.dto";
import { UpdateProductDto } from "../services/dto/update-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { storageConfig } from "../../config/multer.config";

@Controller('products')
export class ProductController{
    constructor (private readonly productService: ProductService){}

    @Post('/createProduct')
    @UseInterceptors(FileInterceptor('gambar_produk', storageConfig))
    createProduct(@Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
        return this.productService.createProduct(createProductDto, file);
    }
   
    @Get()
    async findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get('/productById/:id')
    async findOne(@Param('id') id_produk: string): Promise<Product | null> {
        return this.productService.findOne(id_produk);
    }

    @Put('/editProduct/:id_produk')
    @UseInterceptors(FileInterceptor('gambar_produk', storageConfig))
    async updateProduct(
        @Param('id_produk') id_produk: string,
        @Body() updateData: UpdateProductDto,
        @UploadedFile() file?: Express.Multer.File
    ) {
        return this.productService.updateProduct(id_produk, updateData, file);
    }    

    @Delete('/deleteProduct/:id')
    async deleteProduct(@Param('id') id_produk:string){
        return this.productService.deleteProduct(id_produk)
    }
}