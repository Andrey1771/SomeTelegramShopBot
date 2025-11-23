import { CartDto, CartItemDto } from '../../common/dtos';
import { ProductService } from '../products/product.service';

const carts = new Map<string, CartDto>();
const productService = new ProductService();

export class CartService {
  async getCart(userId: string): Promise<CartDto> {
    if (!carts.has(userId)) {
      carts.set(userId, {
        id: `cart-${userId}`,
        userId,
        createdAt: new Date().toISOString(),
        items: [],
      });
    }
    return carts.get(userId)!;
  }

  async addItem(userId: string, productId: string, quantity: number): Promise<CartDto> {
    const cart = await this.getCart(userId);
    const product = await productService.getById(productId);
    if (!product) throw new Error('Product not found');

    const existing = cart.items.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      const item: CartItemDto = {
        id: `${cart.items.length + 1}`,
        productId,
        quantity,
        unitPrice: product.price,
        product,
      };
      cart.items.push(item);
    }
    return cart;
  }

  async updateItem(userId: string, productId: string, quantity: number): Promise<CartDto> {
    const cart = await this.getCart(userId);
    const item = cart.items.find((i) => i.productId === productId);
    if (!item) throw new Error('Cart item not found');
    item.quantity = quantity;
    return cart;
  }

  async removeItem(userId: string, productId: string): Promise<CartDto> {
    const cart = await this.getCart(userId);
    cart.items = cart.items.filter((i) => i.productId !== productId);
    return cart;
  }

  clearCart(userId: string) {
    carts.delete(userId);
  }
}
