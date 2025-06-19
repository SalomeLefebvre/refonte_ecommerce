import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { OrderItemEntity } from "./entities/order-item.entity";
import { OrderItemController } from "./order-item.controller";
import { OrderItemService } from "./order-item.service";
import { OrderItemRepository } from "./repositories/order-item.repository";
import { OrderEntity } from "src/order/entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderItemEntity, OrderEntity])],
  controllers: [OrderItemController],
  providers: [ OrderItemService,
    {
      provide: OrderItemRepository,
      useFactory: (dataSource: DataSource) => new OrderItemRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: [OrderItemService],
})
export class OrderItemModule {}