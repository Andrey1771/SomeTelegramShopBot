import { Application } from 'express';
import { AuthService } from './auth.service.js';

const authService = new AuthService();

export const registerAuthRoutes = (app: Application) => {
  app.post('/api/auth/telegram', async (req, res) => {
    try {
      const user = await authService.verifyTelegramInitData(req.body ?? {});
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: 'Invalid init data', error: (error as Error).message });
    }
  });
};
