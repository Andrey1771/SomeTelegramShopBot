import { Application } from 'express';
import { PaymentService, PaymentProvider } from './payment.service';

const paymentService = new PaymentService();

export const registerPaymentRoutes = (app: Application) => {
  app.post('/api/payments/create', async (req, res) => {
    try {
      const { orderId, provider } = req.body as { orderId: string; provider: PaymentProvider };
      const payment = await paymentService.createPayment(orderId, provider);
      res.json({ payment });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  (['yookassa', 'stripe', 'crypto'] as PaymentProvider[]).forEach((provider) => {
    app.post(`/api/payments/webhook/${provider}`, async (req, res) => {
      await paymentService.handleWebhook(provider, req.body);
      res.json({ received: true });
    });
  });
};
