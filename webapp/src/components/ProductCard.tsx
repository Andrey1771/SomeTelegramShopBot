import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} />
      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3>{product.title}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <strong>
            {product.price.toLocaleString()} {product.currency}
          </strong>
          <button onClick={() => addItem(product)}>Добавить</button>
        </div>
      </div>
    </div>
  );
};
