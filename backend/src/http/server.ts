import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'express';
import { registerAuthRoutes } from '../modules/auth/auth.routes';
import { registerProductRoutes } from '../modules/products/product.routes';
import { registerCartRoutes } from '../modules/cart/cart.routes';
import { registerOrderRoutes } from '../modules/orders/order.routes';
import { registerPaymentRoutes } from '../modules/payments/payment.routes';
import { registerAiRoutes } from '../modules/ai/ai.routes';

export const createHttpServer = () => {
  const app = express();
  app.use(cors());
  app.use(json());
  app.use(morgan('dev'));

  app.get('/health', (_, res) => {
    res.json({ status: 'ok' });
  });

  registerAuthRoutes(app);
  registerProductRoutes(app);
  registerCartRoutes(app);
  registerOrderRoutes(app);
  registerPaymentRoutes(app);
  registerAiRoutes(app);

  return app;
};
