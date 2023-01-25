import { MigrationInterface, QueryRunner } from "typeorm";
import { EnabledCountries } from "@gemunion/constants";

export function createCountryEnum(ns: string, countries = Object.keys(EnabledCountries)) {
  return class CreateCountryEnum1561991000006 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        CREATE TYPE ${ns}.country_enum AS ENUM (${countries.map(c => `'${c}'`).join(",")});
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP TYPE ${ns}.country_enum;`);
    }
  };
}
