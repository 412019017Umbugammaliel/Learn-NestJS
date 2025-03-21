import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    nama_produk: string;

    @IsNotEmpty()
    @IsString()
    kode_produk: string;

    @IsNotEmpty()
    @IsString()
    kategori_produk: string;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    harga_satuan: number;

    @IsOptional()
    @IsString()
    gambar_produk?: string;
}