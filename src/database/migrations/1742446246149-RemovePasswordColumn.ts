import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovePasswordColumn1742446246149 implements MigrationInterface {
    name = 'RemovePasswordColumn1742446246149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(255) NOT NULL`);
    }

}
