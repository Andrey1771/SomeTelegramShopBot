import axios from 'axios';
import { env } from '../../config/env.js';
import { AiMessageDto } from '../../common/dtos.js';

export class AiService {
  async respond(message: AiMessageDto) {
    if (!env.AI_API_URL) {
      return {
        text: 'AI-ассистент пока не настроен. Добавьте AI_API_URL и AI_API_KEY в .env.',
      };
    }

    const response = await axios.post(
      env.AI_API_URL,
      {
        messages: [
          { role: 'system', content: `Mode: ${message.mode}` },
          { role: 'user', content: message.prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${env.AI_API_KEY ?? ''}`,
        },
        timeout: 10_000,
      },
    );

    return response.data;
  }
}
