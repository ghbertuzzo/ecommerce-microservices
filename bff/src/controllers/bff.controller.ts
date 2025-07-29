import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CHECKOUT_SERVICE_RABBITMQ, ORDER_CREATED } from 'src/shared/constants';
import { BffService } from 'src/services/bff.service';

@Controller('orders')
export class BffController {
    constructor(
        private readonly bffService: BffService,
        @Inject(CHECKOUT_SERVICE_RABBITMQ) private readonly client: ClientProxy,
    ) { }

    @Post("order")
    async createOrder(@Body() order: CreateOrderDto) {
        this.client.emit(ORDER_CREATED, order);
        return { message: "Order sent to RabbitMQ Checkout", order };
    }

    @Get('order/:orderId')
    async getOrderDetails(@Param('orderId') orderId: string) {
        return this.bffService.getOrderDetails(orderId);
    }
}
