import { Injectable } from "@nestjs/common";
import { PaymentType } from "../payments/interfaces/payment-type.interface";
import { PixType } from "../payments/payment-type/pix.type";
import { CreditCardType } from "../payments/payment-type/credit-card.type";
import { BoletoType } from "../payments/payment-type/boleto.type";
import { PaymentTypeEnum } from "./enums/payment-type.enum";

@Injectable()
export class PaymentFactory {
  constructor(
    private readonly pix: PixType,
    private readonly creditCard: CreditCardType,
    private readonly boleto: BoletoType,
  ) { }

  getStrategy(method: string): PaymentType {
    switch (method) {
      case PaymentTypeEnum.PIX: return this.pix;
      case PaymentTypeEnum.CREDIT_CARD: return this.creditCard;
      case PaymentTypeEnum.BOLETO: return this.boleto;
      default: throw new Error('Método de pagamento inválido');
    }
  }
}
