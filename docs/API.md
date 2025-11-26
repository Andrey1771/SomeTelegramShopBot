# API

## Auth
### POST /api/auth/telegram
- body: `initData` из Telegram WebApp
- response: `{ user: UserDto }`

## Catalog
### GET /api/products
- query: `search`, `category`, `minPrice`, `maxPrice`
- response: `{ items: ProductDto[] }`

### GET /api/products/:id
- response: `{ product: ProductDto }`

### POST /api/products
- body: `ProductCreateDto`
- response: `{ product: ProductDto }`

## Cart
(заголовок `x-user-id` обязателен)

### GET /api/cart
- response: `{ cart: CartDto }`

### POST /api/cart/add
- body: `{ productId, quantity }`

### POST /api/cart/update
- body: `{ productId, quantity }`

### POST /api/cart/remove
- body: `{ productId }`

## Orders
### POST /api/orders/create
- response: `{ order: OrderDto }`

### GET /api/orders
- response: `{ items: OrderDto[] }`

### GET /api/orders/:id
- response: `{ order: OrderDto }`

## Payments
### POST /api/payments/create
- body: `{ orderId, provider }`

### POST /api/payments/webhook/{provider}
- body: payload от платёжного провайдера

## AI
### POST /api/ai/assist
- body: `{ mode: 'buyer_assist' | 'seller_assist', prompt: string }`
- response: `{ result: any }`
