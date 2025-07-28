import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Checkout } from './entities/checkout.entity';
import { CreateCheckoutDto } from './dtos/create-checkout.dto';
import { CheckoutItemDto } from './dtos/checkout-item.dto';

@Injectable()
export class CheckoutService {
    constructor(
        @InjectRepository(Checkout) private readonly checkoutRepo: Repository<Checkout>,
    ) { }

    async handleProcessOrder(order: any): Promise<Checkout> {
        console.log('CHECKOUT SERVICE: Received new order: ', order);

        const items: CheckoutItemDto[] = order.items.map((item: any) => ({
            product_id: item.product_id,
            product_name: item.product_name,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_price: item.unit_price * item.quantity,
        }));

        const checkoutDto: CreateCheckoutDto = {
            customer_id: order.customer_id,
            order_total: items.reduce((sum, item) => sum + item.total_price, 0),
            created_at: new Date(),
            items,
        };

        const savedCheckout = await this.create(checkoutDto);
        return savedCheckout;
    }

    async create(data: CreateCheckoutDto): Promise<Checkout> {
        const checkout = this.checkoutRepo.create({
            customer_id: data.customer_id,
            order_total: data.order_total,
            created_at: data.created_at,
            items: data.items.map((item) => ({
                product_id: item.product_id,
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: item.unit_price,
                total_price: item.total_price,
            })),
        });

        return this.checkoutRepo.save(checkout);
    }
}
