import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsers1742281324502 implements MigrationInterface {
    name = 'CreateTableUsers1742281324502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nik" character varying NOT NULL, "name" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, "bagian" character varying(300) NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
