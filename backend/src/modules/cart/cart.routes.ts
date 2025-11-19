import { Application } from 'express';
import { CartService } from './cart.service.js';

const cartService = new CartService();

const resolveUserId = (req: any) => (req.headers['x-user-id'] as string) ?? 'demo-user';

export const registerCartRoutes = (app: Application) => {
  app.get('/api/cart', async (req, res) => {
    const cart = await cartService.getCart(resolveUserId(req));
    res.json({ cart });
  });

  app.post('/api/cart/add', async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const cart = await cartService.addItem(resolveUserId(req), productId, Number(quantity ?? 1));
      res.json({ cart });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.post('/api/cart/update', async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const cart = await cartService.updateItem(resolveUserId(req), productId, Number(quantity ?? 1));
      res.json({ cart });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.post('/api/cart/remove', async (req, res) => {
    const { productId } = req.body;
    const cart = await cartService.removeItem(resolveUserId(req), productId);
    res.json({ cart });
  });
};
