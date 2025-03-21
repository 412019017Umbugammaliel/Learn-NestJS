import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImageToProduct1742520100482 implements MigrationInterface {
    name = 'AddImageToProduct1742520100482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "gambar_produk" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "gambar_produk"`);
    }

}
