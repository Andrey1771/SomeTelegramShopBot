import React from 'react';

export interface FiltersProps {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  onChange: (next: Partial<Record<'search' | 'category' | 'minPrice' | 'maxPrice', string>>) => void;
}

export const Filters: React.FC<FiltersProps> = ({ search, category, minPrice, maxPrice, onChange }) => {
  return (
    <div className="filters">
      <input placeholder="Поиск" value={search} onChange={(e) => onChange({ search: e.target.value })} />
      <select value={category} onChange={(e) => onChange({ category: e.target.value })}>
        <option value="">Все категории</option>
        <option value="electronics">Электроника</option>
        <option value="fashion">Одежда</option>
        <option value="home">Дом</option>
      </select>
      <input placeholder="Мин. цена" value={minPrice} onChange={(e) => onChange({ minPrice: e.target.value })} />
      <input placeholder="Макс. цена" value={maxPrice} onChange={(e) => onChange({ maxPrice: e.target.value })} />
    </div>
  );
};
