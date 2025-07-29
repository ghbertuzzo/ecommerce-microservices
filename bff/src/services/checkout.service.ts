import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CheckoutService {
    private readonly checkoutUrl = 'http://checkout:3000/checkout';

    async getCheckout(orderId: string) {
        const response = await axios.get(`${this.checkoutUrl}/order/${orderId}`);
        return response.data;
    }
}
