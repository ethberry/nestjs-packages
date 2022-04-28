import { MigrationInterface, QueryRunner } from "typeorm";

export function createDomainUint256() {
  return class CreateDomainUint2561561991000002 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        CREATE DOMAIN uint256 AS NUMERIC NOT NULL
          CHECK (VALUE >= 0 AND VALUE < 2^256)
          CHECK (SCALE(VALUE) = 0);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        DROP DOMAIN uint256;
      `);
    }
  };
}
