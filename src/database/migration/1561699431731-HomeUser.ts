import {MigrationInterface, QueryRunner} from "typeorm";

export class HomeUser1561699431731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "sex" varchar NOT NULL, "role" varchar NOT NULL DEFAULT ('Regular'), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "home" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "title" varchar NOT NULL, "available" varchar NOT NULL, "rent" integer NOT NULL, "totalRooms" integer NOT NULL, "totalArea" integer NOT NULL, "address" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_home" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "title" varchar NOT NULL, "available" varchar NOT NULL, "rent" integer NOT NULL, "totalRooms" integer NOT NULL, "totalArea" integer NOT NULL, "address" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL, CONSTRAINT "FK_8aa91f80ffd89341dc75b187b52" FOREIGN KEY ("user_id") REFERENCES "Users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_home"("id", "user_id", "title", "available", "rent", "totalRooms", "totalArea", "address", "latitude", "longitude") SELECT "id", "user_id", "title", "available", "rent", "totalRooms", "totalArea", "address", "latitude", "longitude" FROM "home"`);
        await queryRunner.query(`DROP TABLE "home"`);
        await queryRunner.query(`ALTER TABLE "temporary_home" RENAME TO "home"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "home" RENAME TO "temporary_home"`);
        await queryRunner.query(`CREATE TABLE "home" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "user_id" integer NOT NULL, "title" varchar NOT NULL, "available" varchar NOT NULL, "rent" integer NOT NULL, "totalRooms" integer NOT NULL, "totalArea" integer NOT NULL, "address" varchar NOT NULL, "latitude" integer NOT NULL, "longitude" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "home"("id", "user_id", "title", "available", "rent", "totalRooms", "totalArea", "address", "latitude", "longitude") SELECT "id", "user_id", "title", "available", "rent", "totalRooms", "totalArea", "address", "latitude", "longitude" FROM "temporary_home"`);
        await queryRunner.query(`DROP TABLE "temporary_home"`);
        await queryRunner.query(`DROP TABLE "home"`);
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
