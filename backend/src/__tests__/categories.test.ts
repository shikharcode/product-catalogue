import request from 'supertest';
import { createApp } from '../app';
import { IProductService } from '../services/IProductService';
import { IEmailService } from '../services/IEmailService';
import { Product } from '../types';

// 4 products: sort by rating desc → top 3 = featured, 1 = additional
const mockProducts: Product[] = [
  { id: 1, title: 'A', price: 1, description: '', category: 'electronics', image: '', rating: { rate: 4.8, count: 10 } },
  { id: 2, title: 'B', price: 2, description: '', category: 'electronics', image: '', rating: { rate: 4.2, count: 8 } },
  { id: 3, title: 'C', price: 3, description: '', category: 'electronics', image: '', rating: { rate: 3.5, count: 5 } },
  { id: 4, title: 'D', price: 4, description: '', category: 'electronics', image: '', rating: { rate: 2.1, count: 3 } },
];

const productService: IProductService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  getByCategory: jest.fn().mockResolvedValue(mockProducts),
  getCategories: jest.fn().mockResolvedValue(['electronics', 'clothing']),
  getByIds: jest.fn(),
  search: jest.fn(),
};

const emailService: IEmailService = { sendEnquiry: jest.fn() };

const app = createApp(productService, emailService);

describe('GET /api/categories', () => {
  it('returns all categories', async () => {
    const res = await request(app).get('/api/categories');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(['electronics', 'clothing']);
  });
});

describe('GET /api/categories/:category', () => {
  it('splits products into featured (top 3) and additional', async () => {
    const res = await request(app).get('/api/categories/electronics');
    expect(res.status).toBe(200);
    expect(res.body.featured).toHaveLength(3);
    expect(res.body.additional).toHaveLength(1);
  });

  it('sorts featured by rating descending', async () => {
    const res = await request(app).get('/api/categories/electronics');
    const [first, second, third] = res.body.featured as Product[];
    expect(first.rating.rate).toBeGreaterThanOrEqual(second.rating.rate);
    expect(second.rating.rate).toBeGreaterThanOrEqual(third.rating.rate);
  });

  it('includes the category name in the response', async () => {
    const res = await request(app).get('/api/categories/electronics');
    expect(res.body.category).toBe('electronics');
  });
});
