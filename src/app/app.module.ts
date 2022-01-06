import { Module } from '@nestjs/common'
import { ItemsModule } from './items/items.module'
import { DbModule } from '../db/db.module'

@Module({
  imports: [ItemsModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
