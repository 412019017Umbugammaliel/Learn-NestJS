import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductRepository {
    constructor (@InjectRepository(Product) private readonly repo: Repository<Product>){}

    async createProduct(productData: Partial<Product>): Promise<Product>{
        const product = this.repo.create(productData);
        return await this.repo.save(product)
    }

    async findAll():Promise<Product[]> {
        return await this.repo.find();
    }

    async findOne(id_produk:string): Promise<Product> {
        const product = await this.repo.findOne ({ where: { id_produk }});
        if (!product){
            throw new NotFoundException('Product not found')
        }
        return product;
    }

    async updateProduct(id_produk:string, updateData:Partial<Product>): Promise<Product>{
        const product = await this.findOne(id_produk);
        Object.assign(product, updateData);
        return await this.repo.save(product);
    }

    async deleteProduct(id_produk:string): Promise<void>{
        const product = await this.findOne(id_produk);
        if(!product){
            throw new NotFoundException('Product not found')
        }
        await this.repo.delete(id_produk);
    }
}