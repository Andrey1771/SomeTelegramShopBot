import React, { useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from '../components/ProductCard';
import { Filters } from '../components/Filters';
import { CartDrawer } from '../components/CartDrawer';
import { useCart } from '../context/CartContext';
import { api } from '../api/client';

export const App: React.FC = () => {
  const [filters, setFilters] = useState({ search: '', category: '', minPrice: '', maxPrice: '' });
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const queryParams = useMemo(() => ({
    search: filters.search || undefined,
    category: filters.category || undefined,
    minPrice: filters.minPrice || undefined,
    maxPrice: filters.maxPrice || undefined,
  }), [filters]);

  const { data: products = [], isLoading } = useProducts(queryParams);

  const handleCheckout = async () => {
    const { data } = await api.post('/api/orders/create');
    alert(`Заказ ${data.order.id} создан!`);
    setCartOpen(false);
  };

  return (
    <div className="app">
      <header>
        <div>
          <h1>AI Shop</h1>
          <p>Каталог, корзина и заказы внутри Telegram WebApp</p>
        </div>
        <button className="cart-button" onClick={() => setCartOpen(true)}>
          🧺 Корзина ({items.length})
        </button>
      </header>

      <Filters
        {...filters}
        onChange={(next) => setFilters((prev) => ({ ...prev, ...next }))}
      />

      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCheckout={handleCheckout} />
    </div>
  );
};
