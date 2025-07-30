import { BffService } from "./bff.service";
import { CheckoutService } from "./checkout.service";
import { ExpeditionService } from "./expedition.service";
import { PaymentService } from "./payment.service";

jest.mock('./checkout.service');
jest.mock('./payment.service');
jest.mock('./expedition.service');

describe('BffService', () => {
    let bffService: BffService;
    let checkoutService: jest.Mocked<CheckoutService>;
    let paymentService: jest.Mocked<PaymentService>;
    let expeditionService: jest.Mocked<ExpeditionService>;

    beforeEach(() => {
        checkoutService = new CheckoutService() as jest.Mocked<CheckoutService>;
        paymentService = new PaymentService() as jest.Mocked<PaymentService>;
        expeditionService = new ExpeditionService() as jest.Mocked<ExpeditionService>;

        bffService = new BffService(checkoutService, paymentService, expeditionService);
    });

    it('deve retornar os detalhes do pedido com sucesso de todos os serviços', async () => {
        (checkoutService.getCheckout as jest.Mock).mockResolvedValue(
            {
                order_total: "62.00",
                items: [
                    {
                        quantity: "2",
                        unit_price: "18,50",
                        total_price: "37"
                    },
                    {
                        quantity: "1",
                        unit_price: "25,00",
                        total_price: "25"
                    },
                ],
            }
        );
        (paymentService.getPayment as jest.Mock).mockResolvedValue(
            {
                amount: "62.00",
                method: "CREDIT_CARD",
                status: "APPROVED"
            }
        );
        (expeditionService.getExpedition as jest.Mock).mockResolvedValue(
            {
                recipientName: "Nome de Teste",
                deliveryStatus: "IN_TRANSIT",
                trackingCode: "QV229930959BR",
            }
        );

        const result = await bffService.getOrderDetails('3ef9bd75-56ed-406b-b8cf-426d8487a912');

        expect(result).toEqual({
            checkout: {
                order_total: "62.00",
                items: [
                    { quantity: "2", unit_price: "18,50", total_price: "37" },
                    { quantity: "1", unit_price: "25,00", total_price: "25" },
                ],
            },
            payment: {
                amount: "62.00",
                method: "CREDIT_CARD",
                status: "APPROVED"
            },
            expedition: {
                recipientName: "Nome de Teste",
                deliveryStatus: "IN_TRANSIT",
                trackingCode: "QV229930959BR"
            }
        });
    });

    it('deve lidar com falha em apenas um dos serviços', async () => {
        (checkoutService.getCheckout as jest.Mock).mockResolvedValue(
            {
                order_total: "62.00",
                items: [
                    {
                        quantity: "2",
                        unit_price: "18,50",
                        total_price: "37"
                    },
                    {
                        quantity: "1",
                        unit_price: "25,00",
                        total_price: "25"
                    },
                ],
            }
        );
        (paymentService.getPayment as jest.Mock).mockResolvedValue(
            {
                amount: "62.00",
                method: "CREDIT_CARD",
                status: "APPROVED"
            }
        );
        (expeditionService.getExpedition as jest.Mock).mockRejectedValue(new Error('erro ao buscar expedição'));

        const result = await bffService.getOrderDetails('3ef9bd75-56ed-406b-b8cf-426d8487a912');

        expect(result).toEqual({
            checkout: {
                order_total: "62.00",
                items: [
                    { quantity: "2", unit_price: "18,50", total_price: "37" },
                    { quantity: "1", unit_price: "25,00", total_price: "25" },
                ],
            },
            payment: {
                amount: "62.00",
                method: "CREDIT_CARD",
                status: "APPROVED"
            },
            expedition: { status: 'erro ao buscar expedição' }
        });
    });

    it('deve lançar exceção se todos os serviços falharem', async () => {
        (checkoutService.getCheckout as jest.Mock).mockRejectedValue(new Error('erro ao buscar checkout'));
        (paymentService.getPayment as jest.Mock).mockRejectedValue(new Error('erro ao buscar pagamento'));
        (expeditionService.getExpedition as jest.Mock).mockRejectedValue(new Error('erro ao buscar expedição'));

        await expect(bffService.getOrderDetails('3ef9bd75-56ed-406b-b8cf-426d8487a912')).rejects.toThrow('Não foi possível obter os detalhes do pedido.');
    });
})