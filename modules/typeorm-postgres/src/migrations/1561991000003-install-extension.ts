import { MigrationInterface, QueryRunner } from "typeorm";

export function installExtensionUUID() {
  return class InstallExtensionUUID1561991000003 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.query(`DROP EXTENSION IF EXISTS "uuid-ossp";`);
    }
  };
}
