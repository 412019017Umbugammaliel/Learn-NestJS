import { Body, Controller, Get, Param, Put, Post, Delete, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ProductService } from "../services/product.service";
import { Product } from "../entities/product.entity"
import { CreateProductDto } from "../services/dto/create-product.dto";
import { UpdateProductDto } from "../services/dto/update-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller('products')
export class ProductController{
    constructor (private readonly productService: ProductService){}

    @Post('/createProduct')
    @UseInterceptors(
        FileInterceptor('gambar_produk', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
                },
            }),
        }),
    )
    @Post('/createProduct')
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
    async updateProduct(@Param('id_produk') id_produk:string, @Body() updateData: UpdateProductDto) {
        return this.productService.updateProduct(id_produk, updateData);
    }

    @Delete('/deleteProduct/:id')
    async deleteProduct(@Param('id') id_produk:string){
        return this.productService.deleteProduct(id_produk)
    }
}