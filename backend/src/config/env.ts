import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf-8');
  content
    .split(/\r?\n/) // handle LF/CRLF
    .filter((line) => line.trim() && !line.trim().startsWith('#'))
    .forEach((line) => {
      const [rawKey, ...rest] = line.split('=');
      const key = rawKey.trim();
      const value = rest.join('=').trim();
      if (key && process.env[key] === undefined) {
        process.env[key] = value;
      }
    });
}

export interface EnvConfig {
  PORT: number;
  BOT_TOKEN: string;
  TELEGRAM_WEBAPP_URL: string;
  DATABASE_URL: string;
  AI_API_KEY?: string;
  AI_API_URL?: string;
}

const required = ['BOT_TOKEN', 'DATABASE_URL'] as const;

required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️  Missing env variable ${key}. Some features may not work.`);
  }
});

export const env: EnvConfig = {
  PORT: Number(process.env.PORT ?? 4000),
  BOT_TOKEN: process.env.BOT_TOKEN ?? '<YOUR_BOT_TOKEN>',
  TELEGRAM_WEBAPP_URL: process.env.TELEGRAM_WEBAPP_URL ?? 'https://example.com/webapp',
  DATABASE_URL: process.env.DATABASE_URL ?? 'postgresql://user:password@postgres:5432/shop',
  AI_API_KEY: process.env.AI_API_KEY,
  AI_API_URL: process.env.AI_API_URL,
};
