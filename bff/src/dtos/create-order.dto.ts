export class CreateOrderDto {
    customer_id: string;
    payment_method: string;
    items: {
        product_id: string;
        product_name: string;
        quantity: number;
        unit_price: number;
    }[];
    recipientName: string;
    deliveryForecast: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        postalCode: string;
    };
}
