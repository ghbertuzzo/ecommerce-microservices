import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
    private readonly paymentUrl = 'http://payments:3000/payments';

    async getPayment(orderId: string) {
        const response = await axios.get(`${this.paymentUrl}/order/${orderId}`);
        return response.data;
    }
}
