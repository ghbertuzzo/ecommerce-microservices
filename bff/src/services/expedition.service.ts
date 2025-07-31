import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExpeditionService {
    private readonly expeditionUrl = 'http://expedition:3000/expedition';

    async getExpedition(orderId: string) {
        const response = await axios.get(`${this.expeditionUrl}/order/${orderId}`);
        return response.data;
    }
    
    async getAll() {
        const response = await axios.get(this.expeditionUrl);
        return response.data;
    }
}
