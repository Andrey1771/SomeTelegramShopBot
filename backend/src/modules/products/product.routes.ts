import { Application } from 'express';
import { ProductService } from './product.service.js';

const productService = new ProductService();

export const registerProductRoutes = (app: Application) => {
  app.get('/api/products', async (req, res) => {
    const { category, search, minPrice, maxPrice } = req.query;
    const products = await productService.list({
      category: category?.toString(),
      search: search?.toString(),
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
    res.json({ items: products });
  });

  app.get('/api/products/:id', async (req, res) => {
    const product = await productService.getById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ product });
  });

  app.post('/api/products', async (req, res) => {
    const payload = req.body;
    const product = await productService.create(payload);
    res.status(201).json({ product });
  });
};
