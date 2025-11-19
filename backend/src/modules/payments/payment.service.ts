import { OrderService } from '../orders/order.service.js';

export type PaymentProvider = 'yookassa' | 'stripe' | 'crypto';

interface CreatePaymentResponse {
  orderId: string;
  provider: PaymentProvider;
  status: 'pending';
  paymentUrl?: string;
  paymentIntentId?: string;
}

export class PaymentService {
  constructor(private readonly orderService = new OrderService()) {}

  async createPayment(orderId: string, provider: PaymentProvider): Promise<CreatePaymentResponse> {
    const order = await this.orderService.getOrder(orderId);
    if (!order) throw new Error('Order not found');

    return {
      orderId: order.id,
      provider,
      status: 'pending',
      paymentUrl: `https://pay.example.com/${provider}/${order.id}`,
    };
  }

  async handleWebhook(provider: PaymentProvider, payload: any) {
    const orderId = payload?.metadata?.orderId ?? payload?.orderId;
    if (orderId) {
      await this.orderService.markPaid(orderId);
    }
    console.log(`Webhook from ${provider}`, payload);
  }
}
