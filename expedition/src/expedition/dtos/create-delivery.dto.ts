import { DeliveryStatus } from '../enums/delivery-status.enum';
import { CreateAddressDto } from './create-address.dto';

export class CreateDeliveryDto {
  orderId: string;
  recipientName: string;
  address: CreateAddressDto;
  deliveryForecast: Date;
  deliveredAt?: Date;
  trackingCode?: string;
  deliveryStatus?: DeliveryStatus;
}
