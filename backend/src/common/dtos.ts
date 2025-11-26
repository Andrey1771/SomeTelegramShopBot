export type UserRole = 'buyer' | 'seller' | 'admin';

export interface UserDto {
  id: string;
  telegramId: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
}

export interface ProductDto {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category?: string;
  images: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CartItemDto {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product?: ProductDto;
}

export interface CartDto {
  id: string;
  userId: string;
  items: CartItemDto[];
  createdAt: string;
}

export interface OrderItemDto {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface OrderDto {
  id: string;
  buyerId: string;
  items: OrderItemDto[];
  totalAmount: number;
  currency: string;
  status: 'created' | 'paid' | 'cancelled';
  createdAt: string;
}

export interface AiMessageDto {
  mode: 'buyer_assist' | 'seller_assist';
  prompt: string;
}
