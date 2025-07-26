import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  processPayment(order: any): Boolean {
      return true;
  }
  getHello(): string {
    return 'Hello World Payments!';
  }
}
