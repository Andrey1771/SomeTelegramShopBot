# SomeTelegramShopBot

Telegram-бот и Telegram WebApp (mini-app) для маркетплейса с AI-ассистентом.

## Структура репозитория
- `backend/` — API, Telegram-бот, интеграции с AI, платежами и БД (Prisma + PostgreSQL)
- `webapp/` — React WebApp для каталога и корзины внутри Telegram
- `deploy/` — docker-compose и базовая инфраструктура
- `docs/` — дополнительная документация (API и пример `.env`)

## Требования
- Node.js 20+
- pnpm/npm/yarn
- Docker (для локального запуска всех сервисов одновременно)

## Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Сервер запускается на `http://localhost:4000`. Команда `npm run dev` поднимает HTTP API и Telegram-бота (Telegraf/grammY).

### Переменные окружения backend
Пример файла `.env` находится в `docs/env.example`. Основные переменные:
- `BOT_TOKEN` — токен Telegram-бота (если не указан, HTTP API поднимется без запуска бота)
- `DATABASE_URL` — строка подключения PostgreSQL
- `TELEGRAM_WEBAPP_URL` — URL размещённого WebApp
- `AI_API_URL`, `AI_API_KEY` — настройки AI-провайдера

## WebApp
```bash
cd webapp
npm install
npm run dev
```

Приложение стартует на `http://localhost:5173`. Передавайте `VITE_API_URL` для указания адреса backend.

## Docker Compose
В папке `deploy/` находится `docker-compose.yml`, который поднимает:
- backend (Node.js)
- webapp (Vite build + nginx)
- PostgreSQL

```bash
cd deploy
docker compose up --build
```

## Документация
- `docs/API.md` — список основных REST-эндпоинтов
- `docs/env.example` — пример конфигурации переменных окружения
