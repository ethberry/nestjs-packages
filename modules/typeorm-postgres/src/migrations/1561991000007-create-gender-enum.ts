import { MigrationInterface, QueryRunner } from "typeorm";
import { EnabledGenders } from "@gemunion/constants";

export function createGenderEnum(ns: string, genders = Object.keys(EnabledGenders)) {
  return class CreateGenderEnum1561991000007 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        CREATE TYPE IF NOT EXISTS ${ns}.gender_enum AS ENUM (${genders.map(g => `'${g}'`).join(",")});
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP TYPE ${ns}.gender_enum;`);
    }
  };
}
