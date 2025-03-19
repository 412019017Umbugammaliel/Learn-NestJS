import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToUsers1742347774177 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(255) NOT NULL DEFAULT 'temp_password'`
    );

    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "password" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
  }
}
