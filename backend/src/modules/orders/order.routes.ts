import { Application } from 'express';
import { OrderService } from './order.service.js';

const orderService = new OrderService();
const resolveUserId = (req: any) => (req.headers['x-user-id'] as string) ?? 'demo-user';

export const registerOrderRoutes = (app: Application) => {
  app.post('/api/orders/create', async (req, res) => {
    try {
      const order = await orderService.createOrder(resolveUserId(req));
      res.status(201).json({ order });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.get('/api/orders', async (req, res) => {
    const orders = await orderService.listOrders(resolveUserId(req));
    res.json({ items: orders });
  });

  app.get('/api/orders/:id', async (req, res) => {
    const order = await orderService.getOrder(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json({ order });
  });
};
