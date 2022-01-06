import { MigrationInterface, QueryRunner, TableCheck } from 'typeorm'
import { ItemStatus } from '../app/items/models/item-status.model'

export class AddCheckConstraintOnItem1641383488491
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE item ADD CONSTRAINT ck_item_status CHECK (status = 'SoldOut' OR status = 'OnSale')",
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE item DROP CHECK ck_item_status')
  }
}
