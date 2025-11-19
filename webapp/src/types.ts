export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category?: string;
  images: string[];
}

export interface CartResponse {
  cart: {
    id: string;
    items: {
      id: string;
      productId: string;
      quantity: number;
      unitPrice: number;
      product?: Product;
    }[];
  };
}
