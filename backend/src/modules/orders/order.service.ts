import { CartService } from '../cart/cart.service.js';
import { OrderDto } from '../../common/dtos.js';

const orders = new Map<string, OrderDto>();
let counter = 1;

export class OrderService {
  constructor(private readonly cartService = new CartService()) {}

  async createOrder(userId: string): Promise<OrderDto> {
    const cart = await this.cartService.getCart(userId);
    if (cart.items.length === 0) throw new Error('Cart is empty');

    const totalAmount = cart.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const order: OrderDto = {
      id: `order-${counter++}`,
      buyerId: userId,
      items: cart.items.map((item) => ({
        id: `${item.id}`,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })),
      totalAmount,
      currency: 'RUB',
      status: 'created',
      createdAt: new Date().toISOString(),
    };
    orders.set(order.id, order);
    this.cartService.clearCart(userId);
    return order;
  }

  async listOrders(userId: string): Promise<OrderDto[]> {
    return Array.from(orders.values()).filter((order) => order.buyerId === userId);
  }

  async getOrder(id: string): Promise<OrderDto | undefined> {
    return orders.get(id);
  }

  async markPaid(orderId: string) {
    const order = orders.get(orderId);
    if (order) {
      order.status = 'paid';
    }
  }
}
