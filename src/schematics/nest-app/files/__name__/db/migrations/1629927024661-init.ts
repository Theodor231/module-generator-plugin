import {MigrationInterface, QueryRunner} from "typeorm";

export class init1629927024661 implements MigrationInterface {
    name = 'init1629927024661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "role" character varying NOT NULL, "action" character varying NOT NULL DEFAULT '', "module" character varying NOT NULL DEFAULT '', "access" boolean NOT NULL DEFAULT false, "levels" character varying NOT NULL DEFAULT 'own', "fields" jsonb DEFAULT '[]', "availableFields" jsonb DEFAULT '[]', CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "alias" character varying(100), "guard" character varying(100), "name" character varying(100), CONSTRAINT "UQ_fe3119b8577cd8704656ee51d05" UNIQUE ("alias"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "avatar" jsonb DEFAULT '{}', "email" character varying NOT NULL, "password" character varying, "token" character varying, "roleId" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
    }

}
