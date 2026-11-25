import request from 'supertest';
import { createApp } from '../app';
import { IProductService } from '../services/IProductService';
import { IEmailService } from '../services/IEmailService';
import { Product } from '../types';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 9.99,
  description: 'A test product',
  category: 'electronics',
  image: 'http://example.com/img.jpg',
  rating: { rate: 4.5, count: 100 },
};

const productService: IProductService = {
  getAll: jest.fn().mockResolvedValue([mockProduct]),
  getById: jest.fn().mockResolvedValue(mockProduct),
  getByCategory: jest.fn().mockResolvedValue([mockProduct]),
  getCategories: jest.fn().mockResolvedValue(['electronics']),
  getByIds: jest.fn().mockResolvedValue([mockProduct]),
  search: jest.fn().mockResolvedValue([mockProduct]),
};

const emailService: IEmailService = {
  sendEnquiry: jest.fn().mockResolvedValue(undefined),
};

const app = createApp(productService, emailService);

describe('GET /api/products', () => {
  it('returns all products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([mockProduct]);
    expect(productService.getAll).toHaveBeenCalledTimes(1);
  });

  it('calls search when ?q is provided', async () => {
    const res = await request(app).get('/api/products?q=test');
    expect(res.status).toBe(200);
    expect(productService.search).toHaveBeenCalledWith('test');
  });
});

describe('GET /api/products/featured', () => {
  it('returns featured products via getByIds', async () => {
    const res = await request(app).get('/api/products/featured');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(productService.getByIds).toHaveBeenCalledTimes(1);
  });
});

describe('GET /api/products/:id', () => {
  it('returns a product by id', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('returns 400 for a non-numeric id', async () => {
    const res = await request(app).get('/api/products/abc');
    expect(res.status).toBe(400);
  });
});
