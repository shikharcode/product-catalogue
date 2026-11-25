import { Product, CategoryResult, EnquiryPayload, EnquiryResponse } from '@/types';

const BASE = '/api';

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export const api = {
  getFeatured: (): Promise<Product[]> => get('/products/featured'),

  getProduct: (id: number): Promise<Product> => get(`/products/${id}`),

  searchProducts: (q: string): Promise<Product[]> =>
    get(`/products?q=${encodeURIComponent(q)}`),

  getCategories: (): Promise<string[]> => get('/categories'),

  getCategoryProducts: (category: string): Promise<CategoryResult> =>
    get(`/categories/${encodeURIComponent(category)}`),

  submitEnquiry: async (payload: EnquiryPayload): Promise<EnquiryResponse> => {
    const res = await fetch(`${BASE}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = (await res.json()) as EnquiryResponse;
    if (!res.ok) throw new Error(body.error ?? 'Request failed');
    return body;
  },
};
