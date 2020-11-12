import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1605191883414 implements MigrationInterface {
    name = 'Initial1605191883414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "csone"."metric_entity" ("id" uuid NOT NULL, "voltage0" double precision NOT NULL DEFAULT 0, "voltage1" double precision NOT NULL DEFAULT 0, "voltage2" double precision NOT NULL DEFAULT 0, "voltage3" double precision NOT NULL DEFAULT 0, "voltage4" double precision NOT NULL DEFAULT 0, "voltage5" double precision NOT NULL DEFAULT 0, "voltage6" double precision NOT NULL DEFAULT 0, "voltage7" double precision NOT NULL DEFAULT 0, "deviceTime" TIMESTAMP NOT NULL, CONSTRAINT "PK_52b820412c62bb11a74e7b3d5c6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "csone"."metric_entity"`);
    }

}
