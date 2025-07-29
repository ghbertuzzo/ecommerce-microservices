import { Injectable } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { PaymentService } from './payment.service';
import { ExpeditionService } from './expedition.service';

@Injectable()
export class BffService {
    constructor(
        private readonly checkoutService: CheckoutService,
        private readonly paymentService: PaymentService,
        private readonly expeditionService: ExpeditionService,
    ) { }

    async getOrderDetails(orderId: string) {
        const results = await Promise.allSettled([
            this.checkoutService.getCheckout(orderId),
            this.paymentService.getPayment(orderId),
            this.expeditionService.getExpedition(orderId),
        ]);

        const [checkoutResult, paymentResult, expeditionResult] = results;

        const allFailed = results.every(result => result.status === 'rejected');
        if (allFailed) {
            throw new Error('Não foi possível obter os detalhes do pedido.');
        }

        const extractValue = (result: PromiseSettledResult<any>, error: any) =>
            result.status === 'fulfilled' ? result.value : error;

        return {
            checkout: extractValue(checkoutResult, { status: 'erro ao buscar checkout' }),
            payment: extractValue(paymentResult, { status: 'erro ao buscar pagamento' }),
            expedition: extractValue(expeditionResult, { status: 'erro ao buscar expedição' }),
        };
    }
}
