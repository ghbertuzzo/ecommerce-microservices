import { PaymentProcessedDto } from "../dtos/payment-processed.dto";

export interface PaymentType {
  pay(): Promise<PaymentProcessedDto>;
}
