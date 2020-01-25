/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MigrationInterface, QueryRunner } from "typeorm"

export class UniqueToUser1579944525740 implements MigrationInterface {
  name = "UniqueToUser1579944525740"

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `user` ADD UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`)",
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "ALTER TABLE `user` DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c`",
      undefined
    )
  }
}
