import { Application } from 'express';
import { AiService } from './ai.service.js';

const aiService = new AiService();

export const registerAiRoutes = (app: Application) => {
  app.post('/api/ai/assist', async (req, res) => {
    try {
      const result = await aiService.respond(req.body);
      res.json({ result });
    } catch (error) {
      res.status(500).json({ message: 'AI service error', error: (error as Error).message });
    }
  });
};
