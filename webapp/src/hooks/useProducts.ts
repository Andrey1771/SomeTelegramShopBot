import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import { Product } from '../types';

interface Response {
  items: Product[];
}

export const useProducts = (params: Record<string, string | number | undefined>) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: async () => {
      const { data } = await api.get<Response>('/api/products', { params });
      return data.items;
    },
  });
};
