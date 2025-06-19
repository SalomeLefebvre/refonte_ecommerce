import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from './order/entities/order.entity';
import { CustomerEntity } from './customer/entities/customer.entity';
import { OrderItemEntity } from './order-item/entities/order-item.entity';
import { AddressEntity } from './address/entities/address.entity';


@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "user",
      password: "password",
      database: "e-commerce",
      entities: [OrderEntity, CustomerEntity, OrderItemEntity, AddressEntity],
      autoLoadEntities: true,
      synchronize: true
    })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
