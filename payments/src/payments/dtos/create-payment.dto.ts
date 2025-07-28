import { PaymentTypeEnum } from "../enums/payment-type.enum";

export class CreatePaymentDto {
  id_order: string;
  method: PaymentTypeEnum.PIX | PaymentTypeEnum.BOLETO | PaymentTypeEnum.CREDIT_CARD;
  amount: number;
}