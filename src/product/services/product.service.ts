import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";
import { Repository } from "typeorm";
import { promises } from "dns";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";

@Injectable()
export class ProductService{
    [x: string]: any;
    constructor(
        @InjectRepository(Product) private readonly productRepository:Repository<Product>,
    ){}

    async createProduct(createProductDto: CreateProductDto, file: Express.Multer.File | undefined): Promise<Product> {
        const newProduct = this.productRepository.create({
            ...createProductDto,
            gambar_produk: file ? file.filename : "",
        });
        return await this.productRepository.save(newProduct);
    }

    async findAll(): Promise<Product[]>{
        return this.productRepository.find();
    }

    async findOne(id_produk: string): Promise<Product | null>{
        return this.productRepository.findOne({ where: {id_produk} });
    }

    async updateProduct(id_produk: string, updateData:UpdateProductDto): Promise<Product>{
        const product = await this.productRepository.findOne({ where: {id_produk}});
    if (!product){
        throw new Error('Product not Found')
    }
    Object.assign(product, updateData);
    return await this.productRepository.save(product);
    }
    
    async deleteProduct(id_produk: string): Promise<string> {
        const product = await this.productRepository.findOne({ where: {id_produk}})
        if(!product){
            throw new NotFoundException('Product not found')
        }
        await this.productRepository.delete(id_produk);
        return 'Product has been delete success'
    }
}