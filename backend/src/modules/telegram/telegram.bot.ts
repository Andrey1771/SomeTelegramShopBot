import { Bot, InlineKeyboard } from 'grammy';
import { env } from '../../config/env';
import { ProductService } from '../products/product.service';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../orders/order.service';
import { AiService } from '../ai/ai.service';

export class TelegramBot {
  private readonly bot = new Bot(env.BOT_TOKEN);
  private readonly productService = new ProductService();
  private readonly cartService = new CartService();
  private readonly orderService = new OrderService();
  private readonly aiService = new AiService();

  constructor() {
    this.registerHandlers();
  }

  private registerHandlers() {
    this.bot.command('start', async (ctx) => {
      const keyboard = new InlineKeyboard()
        .webApp('🛍 Каталог', env.TELEGRAM_WEBAPP_URL)
        .text('🧺 Корзина', 'cart')
        .row()
        .text('📦 Мои заказы', 'orders')
        .text('➕ Выставить товар', 'sell')
        .row()
        .text('🤖 AI-ассистент', 'ai');
      await ctx.reply('Привет! Я помогу покупать и продавать товары.', { reply_markup: keyboard });
    });

    this.bot.on('callback_query:data', async (ctx) => {
      const userId = ctx.from?.id.toString() ?? 'anonymous';
      switch (ctx.callbackQuery.data) {
        case 'cart':
          const cart = await this.cartService.getCart(userId);
          await ctx.answerCallbackQuery({ text: `В корзине ${cart.items.length} товаров` });
          break;
        case 'orders':
          const orders = await this.orderService.listOrders(userId);
          await ctx.answerCallbackQuery({ text: `У вас ${orders.length} заказов` });
          break;
        case 'ai':
          await ctx.answerCallbackQuery({ text: 'Напишите сообщение, и AI поможет!' });
          break;
        default:
          await ctx.answerCallbackQuery();
      }
    });

    this.bot.hears(/телефон/i, async (ctx) => {
      const products = await this.productService.list({ search: 'телефон' });
      if (!products.length) return ctx.reply('Подходящих товаров не найдено.');
      const list = products.map((p) => `${p.title} — ${p.price} ${p.currency}`).join('\n');
      await ctx.reply(`Нашёл такие варианты:\n${list}`);
    });

    this.bot.on('message:text', async (ctx) => {
      const text = ctx.message.text;
      if (!text) return;
      const response = await this.aiService.respond({ mode: 'buyer_assist', prompt: text });
      await ctx.reply(response.text ?? 'AI вернул ответ.');
    });
  }

  async launch() {
    await this.bot.start();
    console.log('Telegram bot started');
  }
}
