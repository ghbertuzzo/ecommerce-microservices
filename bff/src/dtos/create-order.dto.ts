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

export class CreateOrderDto {
    @IsUUID()
    customer_id: string;

    @IsIn([PaymentTypeEnum.PIX, PaymentTypeEnum.BOLETO, PaymentTypeEnum.CREDIT_CARD], { message: "Tipos de pagamentos aceito: PIX, BOLETO ou CREDIT_CARD" })
    payment_method: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => OrderItemDto)
    items: OrderItemDto[];

    @IsString()
    @IsNotEmpty({ message: "Campo nome obrigatório" })
    recipientName: string;

    @IsOptional()
    @IsString()
    deliveryForecast?: string;

    @ValidateNested()
    @Type(() => AddressDto)
    address: AddressDto;
}
