import request from 'supertest';
import { createApp } from '../app';
import { IProductService } from '../services/IProductService';
import { IEmailService } from '../services/IEmailService';
import { EnquiryStatus } from '../types';

const productService: IProductService = {
  getAll: jest.fn(),
  getById: jest.fn(),
  getByCategory: jest.fn(),
  getCategories: jest.fn(),
  getByIds: jest.fn(),
  search: jest.fn(),
};

const emailService: IEmailService = {
  sendEnquiry: jest.fn().mockResolvedValue(undefined),
};

const app = createApp(productService, emailService);

const validPayload = {
  productId: 1,
  productTitle: 'Test Product',
  name: 'Jane Smith',
  email: 'jane@example.com',
  message: 'Is this in stock?',
};

describe('POST /api/enquiries', () => {
  beforeEach(() => jest.clearAllMocks());

  it('sends email and returns success status', async () => {
    const res = await request(app).post('/api/enquiries').send(validPayload);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe(EnquiryStatus.Success);
    expect(emailService.sendEnquiry).toHaveBeenCalledTimes(1);
  });

  it('returns 400 when required fields are missing', async () => {
    const res = await request(app).post('/api/enquiries').send({ name: 'Jane' });
    expect(res.status).toBe(400);
    expect(emailService.sendEnquiry).not.toHaveBeenCalled();
  });

  it('returns 400 for an invalid email address', async () => {
    const res = await request(app)
      .post('/api/enquiries')
      .send({ ...validPayload, email: 'not-an-email' });
    expect(res.status).toBe(400);
    expect(emailService.sendEnquiry).not.toHaveBeenCalled();
  });
});
