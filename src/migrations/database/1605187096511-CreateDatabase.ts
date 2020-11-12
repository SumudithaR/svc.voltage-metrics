import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1605187096511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasDatabase('voltage-metrics'))) {
      await queryRunner.query(`CREATE DATABASE "voltage-metrics"`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasDatabase('voltage-metrics'))) {
      await queryRunner.query(`DROP DATABASE "voltage-metrics"`);
    }
  }
}
