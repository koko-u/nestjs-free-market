import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ItemStatus } from '../app/items/models/item-status.model'

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 40, nullable: false })
  name: string

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: false })
  price: number

  @Column({ type: 'text' })
  description: string

  @Column({ enum: ItemStatus })
  status: ItemStatus

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
