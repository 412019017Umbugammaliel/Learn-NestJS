import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableProducts1742281440729 implements MigrationInterface {
    name = 'CreateTableProducts1742281440729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id_produk" uuid NOT NULL DEFAULT uuid_generate_v4(), "nama_produk" character varying(255) NOT NULL, "kode_produk" character varying(300) NOT NULL, "kategori_produk" character varying(300) NOT NULL, "harga_satuan" numeric(10,2) NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_073af8b361500eab23869757cb9" PRIMARY KEY ("id_produk"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
