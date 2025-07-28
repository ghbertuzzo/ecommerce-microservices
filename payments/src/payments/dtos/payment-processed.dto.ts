import { PaymentStatus } from "../enums/payment-status.enum";
import { PaymentTypeEnum } from "../enums/payment-type.enum";

export class PaymentProcessedDto {
  status: PaymentStatus.APPROVED | PaymentStatus.CANCELLED | PaymentStatus.PENDING | PaymentStatus.REJECTED;
  method: PaymentTypeEnum.PIX | PaymentTypeEnum.BOLETO | PaymentTypeEnum.CREDIT_CARD;
}