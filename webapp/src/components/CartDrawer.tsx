import React from 'react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  onCheckout: () => Promise<void>;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose, onCheckout }) => {
  const { items, updateQty, removeItem, total } = useCart();

  return (
    <div className={`cart-drawer ${open ? 'open' : ''}`}>
      <div className="cart-drawer__header">
        <h2>Корзина</h2>
        <button onClick={onClose}>×</button>
      </div>
      {items.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <div>
                  <strong>{item.product.title}</strong>
                  <p>
                    {item.unitPrice.toLocaleString()} {item.product.currency}
                  </p>
                </div>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateQty(item.product.id, Number(e.target.value))}
                />
                <button onClick={() => removeItem(item.product.id)}>Удалить</button>
              </li>
            ))}
          </ul>
          <div className="cart-drawer__footer">
            <p>
              Итог: <strong>{total.toLocaleString()} RUB</strong>
            </p>
            <button onClick={onCheckout}>Оформить заказ</button>
          </div>
        </>
      )}
    </div>
  );
};
