import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')

export class Product{
    @PrimaryGeneratedColumn('uuid')
    id_produk: string;

    @Column({type: 'varchar', length: 255})
    nama_produk:string;
    
    @Column({type: 'varchar', length: 300})
    kode_produk:string;
    
    @Column({type: 'varchar', length: 300})
    kategori_produk:string;
    
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    harga_satuan: number;

    @Column({ type: 'varchar', nullable: true })
    gambar_produk: string;

    @CreateDateColumn({nullable: true})
    created_at?: Date;

    @UpdateDateColumn({nullable: true})
    updated_at?: Date;
}