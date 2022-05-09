import { MigrationInterface, QueryRunner } from "typeorm";
import { EnabledLanguages } from "@gemunion/constants";

export function createLanguageEnum(ns: string, languages = Object.keys(EnabledLanguages)) {
  return class CreateLanguageEnum1561991000004 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        CREATE TYPE ${ns}.language_enum AS ENUM (${languages.map(l => `'${l}'`).join(",")});
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP TYPE ${ns}.language_enum;`);
    }
  };
}
