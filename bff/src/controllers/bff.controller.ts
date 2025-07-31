import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CHECKOUT_SERVICE_RABBITMQ, ORDER_CREATED } from 'src/shared/constants';
import { BffService } from 'src/services/bff.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class BffController {
    constructor(
        private readonly bffService: BffService,
        @Inject(CHECKOUT_SERVICE_RABBITMQ) private readonly client: ClientProxy,
    ) { }

    @Post("order")
    @ApiOperation({ summary: 'Criar novo pedido (envia para fila de checkout via RabbitMQ)' })
    @ApiBody({ type: CreateOrderDto })
    async createOrder(@Body() order: CreateOrderDto) {
        this.client.emit(ORDER_CREATED, order);
        return { message: "Order sent to RabbitMQ Checkout" };
    }

    @Get('order/:orderId')
    @ApiOperation({ summary: 'Buscar detalhes completos de um pedido por ID' })
    @ApiParam({ name: 'orderId', description: 'ID do pedido' })
    async getOrderDetails(@Param('orderId') orderId: string) {
        return this.bffService.getOrderDetails(orderId);
    }

    @Get('checkout')
    @ApiOperation({ summary: 'Listar todos os checkouts' })
    async getAllCheckouts() {
        return this.bffService.getAllCheckouts();
    }

    @Get('payments')
    @ApiOperation({ summary: 'Listar todos os pagamentos' })
    async getAllPayments() {
        return this.bffService.getAllPayments();
    }

    @Get('expedition')
    @ApiOperation({ summary: 'Listar todas as expedições' })
    async getAllExpedition() {
        return this.bffService.getAllExpedition();
    }
}
