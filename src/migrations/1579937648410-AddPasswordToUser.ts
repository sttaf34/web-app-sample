/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MigrationInterface, QueryRunner } from "typeorm"

export class AddPasswordToUser1579937648410 implements MigrationInterface {
  name = "AddPasswordToUser1579937648410"

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `user` ADD `password` varchar(255) NOT NULL",
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `user` DROP COLUMN `password`",
      undefined
    )
  }
}
