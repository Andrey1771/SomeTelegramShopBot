import { createHttpServer } from './http/server';
import { env } from './config/env';
import { TelegramBot } from './modules/telegram/telegram.bot';

const app = createHttpServer();
app.listen(env.PORT, () => {
  console.log(`HTTP server listening on port ${env.PORT}`);
});

if (env.BOT_TOKEN) {
  const bot = new TelegramBot(env.BOT_TOKEN);
  bot.launch().catch((err) => {
    console.error('Failed to launch Telegram bot', err);
  });
} else {
  console.warn('Skipping Telegram bot launch because BOT_TOKEN is not set.');
}
