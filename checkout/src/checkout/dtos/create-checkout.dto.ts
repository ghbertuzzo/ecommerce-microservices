import { CheckoutItemDto } from "./checkout-item.dto";

export class CreateCheckoutDto {
  customer_id: string;
  order_total: number;
  created_at: Date;
  items: CheckoutItemDto[];
}