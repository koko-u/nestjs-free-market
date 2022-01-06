import { MigrationInterface, QueryRunner, Table, TableCheck } from 'typeorm'
import { ItemStatus } from '../app/items/models/item-status.model'

export class CreateItem1641381588469 implements MigrationInterface {
  name = 'CreateItem1641381588469'

  public async up(queryRunner: QueryRunner): Promise<void> {
    const itemTable = new Table({
      name: 'item',
      columns: [
        {
          name: 'id',
          type: 'varchar',
          isPrimary: true,
          isNullable: false,
          generationStrategy: 'uuid',
        },
        {
          name: 'name',
          type: 'varchar',
          length: '40',
          isNullable: false,
        },
        {
          name: 'price',
          type: 'decimal',
          precision: 8,
          scale: 2,
          isNullable: false,
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'status',
          type: 'varchar',
          isNullable: false,
          default: `'${ItemStatus.SoldOut}'`,
        },
        {
          name: 'createdAt',
          type: 'datetime',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
        },
        {
          name: 'updatedAt',
          type: 'datetime',
          isNullable: false,
          default: 'CURRENT_TIMESTAMP',
          onUpdate: 'CURRENT_TIMESTAMP',
        },
      ],
    })
    itemTable.addCheckConstraint(
      new TableCheck({
        name: 'ck_item_status',
        columnNames: ['status'],
        expression: `status = ${ItemStatus.OnSale} OR status = ${ItemStatus.SoldOut}`,
      }),
    )
    await queryRunner.createTable(itemTable)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(new Table({ name: 'item' }))
  }
}
