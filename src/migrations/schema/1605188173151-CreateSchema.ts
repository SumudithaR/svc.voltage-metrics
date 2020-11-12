import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchema1605188173151 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createSchema('csone', true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropSchema('csone', true);
  }
}
