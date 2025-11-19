import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json } from 'express';
import { registerAuthRoutes } from '../modules/auth/auth.routes.js';
import { registerProductRoutes } from '../modules/products/product.routes.js';
import { registerCartRoutes } from '../modules/cart/cart.routes.js';
import { registerOrderRoutes } from '../modules/orders/order.routes.js';
import { registerPaymentRoutes } from '../modules/payments/payment.routes.js';
import { registerAiRoutes } from '../modules/ai/ai.routes.js';

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
