import { Controller, Get, Param, ParseUUIDPipe, } from '@nestjs/common';
import { PROCESS_EXPEDITION } from '../shared/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExpeditionService } from './expedition.service';
import { Delivery } from './entities/delivery.entity';
import { CreateDeliveryDto } from './dtos/create-delivery.dto';

@Controller('expedition')
export class ExpeditionController {
    constructor(
        private readonly expeditionService: ExpeditionService,
    ) { }

    @Get('health')
    getHealth() {
        return { status: 'ok' };
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.expeditionService.getById(id);
    }

    @Get()
    async getAll() {
        return this.expeditionService.getAll();
    }

    @Get('order/:orderId')
    async findByOrderId(@Param('orderId', new ParseUUIDPipe()) orderId: string): Promise<Delivery> {
        return this.expeditionService.findByOrderId(orderId);
    }

    @MessagePattern(PROCESS_EXPEDITION)
    async handleProcessExpedition(@Payload() payload: CreateDeliveryDto) {
        console.log('EXPEDITION SERVICE: Received new expedition order: ', payload);
        const result = await this.expeditionService.handleProcess(payload);
        console.log(result);
    }
}
