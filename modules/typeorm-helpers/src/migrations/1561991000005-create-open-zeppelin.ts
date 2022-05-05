import { MigrationInterface, QueryRunner } from "typeorm";

export function createOpenZeppelin(ns: string) {
  return class CreateOpenZeppelin1561991000005 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        CREATE TYPE ${ns}.oz_permission_type_enum AS ENUM (
          'ACCESS_CONTROL',
          'OWNABLE',
          'UNKNOWN'
        );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP TYPE ${ns}.oz_permission_type_enum;`);
    }
  };
}
