import {
    IsArray,
    IsIn,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentTypeEnum } from 'src/enums/payment-type.enum';
import { OrderItemDto } from './order-item.dto';
import { AddressDto } from './address-dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
    @ApiProperty({ example: '94d2e9d2-7b21-4a6f-b05a-8ef8ddbe4b9c', description: 'ID do cliente' })
    @IsUUID()
    customer_id: string;

    @ApiProperty({
        example: 'PIX',
        enum: PaymentTypeEnum,
        description: 'Forma de pagamento: PIX, BOLETO ou CREDIT_CARD',
    })
    @IsIn([PaymentTypeEnum.PIX, PaymentTypeEnum.BOLETO, PaymentTypeEnum.CREDIT_CARD], { message: "Tipos de pagamentos aceito: PIX, BOLETO ou CREDIT_CARD" })
    payment_method: string;

    @ApiProperty({ type: [OrderItemDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @ApiProperty({ example: 'João da Silva', description: 'Nome do destinatário' })
    @IsString()
    @IsNotEmpty({ message: "Campo nome obrigatório" })
    recipientName: string;

    @ApiProperty({ example: '2025-08-10', required: false, description: 'Previsão de entrega' })
    @IsOptional()
    @IsString()
    deliveryForecast?: string;

    @ApiProperty({ type: AddressDto })
    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}
