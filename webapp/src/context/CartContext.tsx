import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';
import { Product } from '../types';

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  unitPrice: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => Promise<void>;
  updateQty: (productId: string, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    api.get('/api/cart').then(({ data }) => setItems(mapItems(data.cart.items)));
  }, []);

  const mapItems = (serverItems: any[]): CartItem[] =>
    serverItems.map((item) => ({
      id: item.id,
      product: item.product ?? {
        id: item.productId,
        title: 'Товар',
        description: '',
        price: item.unitPrice,
        currency: 'RUB',
        images: ['https://placehold.co/400x300'],
      },
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));

  const refresh = (cart: any) => setItems(mapItems(cart.items));

  const addItem = async (product: Product) => {
    const { data } = await api.post('/api/cart/add', { productId: product.id, quantity: 1 });
    refresh(data.cart);
  };

  const updateQty = async (productId: string, quantity: number) => {
    const { data } = await api.post('/api/cart/update', { productId, quantity });
    refresh(data.cart);
  };

  const removeItem = async (productId: string) => {
    const { data } = await api.post('/api/cart/remove', { productId });
    refresh(data.cart);
  };

  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
