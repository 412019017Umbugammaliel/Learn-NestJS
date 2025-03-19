import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleToUsers1742372522716 implements MigrationInterface {
    name = 'AddRoleToUsers1742372522716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying NOT NULL DEFAULT 'user'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    }

}
