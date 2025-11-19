import { ProductDto } from '../../common/dtos.js';

const mockProducts: ProductDto[] = [
  {
    id: '1',
    sellerId: 'seller-1',
    title: 'Смартфон NovaCam X',
    description: 'Баланс цены и камеры 50 Мп.',
    price: 19990,
    currency: 'RUB',
    category: 'electronics',
    images: ['https://placehold.co/600x400'],
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

export class ProductService {
  async list(query: Partial<{ category: string; search: string; minPrice: number; maxPrice: number }>): Promise<ProductDto[]> {
    return mockProducts.filter((product) => {
      if (query.category && product.category !== query.category) return false;
      if (query.search && !product.title.toLowerCase().includes(query.search.toLowerCase())) return false;
      if (query.minPrice && product.price < query.minPrice) return false;
      if (query.maxPrice && product.price > query.maxPrice) return false;
      return true;
    });
  }

  async getById(id: string): Promise<ProductDto | undefined> {
    return mockProducts.find((product) => product.id === id);
  }

  async create(payload: Omit<ProductDto, 'id' | 'createdAt' | 'status'> & { status?: ProductDto['status'] }): Promise<ProductDto> {
    const product: ProductDto = {
      ...payload,
      id: (mockProducts.length + 1).toString(),
      createdAt: new Date().toISOString(),
      status: payload.status ?? 'active',
    };
    mockProducts.push(product);
    return product;
  }
}
