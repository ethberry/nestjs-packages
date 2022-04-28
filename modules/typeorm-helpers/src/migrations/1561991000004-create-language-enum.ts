import { MigrationInterface, QueryRunner } from "typeorm";

export function createLanguageEnum(ns: string) {
  return class CreateLanguageEnum1561991000004 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        CREATE TYPE ${ns}.language_enum AS ENUM (
          'RU',
          'EN'
        );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP TYPE ${ns}.language_enum;`);
    }
  };
}
