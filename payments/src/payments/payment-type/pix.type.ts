import { Injectable } from "@nestjs/common";
import { PaymentStatus } from "src/payments/enums/payment-status.enum";
import { PaymentTypeEnum } from "src/payments/enums/payment-type.enum";
import { PaymentType } from "src/payments/interfaces/payment-type.interface";
import { PaymentProcessedDto } from "../dtos/payment-processed.dto";

@Injectable()
export class PixType implements PaymentType {
  async pay(): Promise<PaymentProcessedDto> {
    const approved = Math.random() >= 0.5;

    const retorno: PaymentProcessedDto = {
      method: PaymentTypeEnum.PIX,
      status: approved ? PaymentStatus.APPROVED : PaymentStatus.REJECTED,
    };

    return retorno;
  }
}
