import { MigrationInterface, QueryRunner } from "typeorm";

export function createTokenTypesEnum(ns: string) {
  return class CreateTokenTypesEnum1561991000005 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`
        CREATE TYPE IF NOT EXISTS ${ns}.token_type_enum AS ENUM (
          'NATIVE',
          'ERC20',
          'ERC721',
          'ERC721RANDOM',
          'ERC998',
          'ERC998RANDOM',
          'ERC1155'
        );
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP TYPE ${ns}.token_type_enum;`);
    }
  };
}
