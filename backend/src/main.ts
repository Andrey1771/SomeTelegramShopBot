import { createHttpServer } from './http/server';
import { env } from './config/env';
import { TelegramBot } from './modules/telegram/telegram.bot';

const app = createHttpServer();
app.listen(env.PORT, () => {
  console.log(`HTTP server listening on port ${env.PORT}`);
});

const bot = new TelegramBot();
bot.launch().catch((err) => {
  console.error('Failed to launch Telegram bot', err);
});
