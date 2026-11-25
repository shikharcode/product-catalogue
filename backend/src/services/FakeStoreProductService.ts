import { Product } from '../types';
import { IProductService } from './IProductService';

export class FakeStoreProductService implements IProductService {
  constructor(private readonly baseUrl: string) {}

  async getAll(): Promise<Product[]> {
    return this.fetch<Product[]>('/products');
  }

  async getById(id: number): Promise<Product> {
    return this.fetch<Product>(`/products/${id}`);
  }

  async getByCategory(category: string): Promise<Product[]> {
    return this.fetch<Product[]>(`/products/category/${encodeURIComponent(category)}`);
  }

  async getCategories(): Promise<string[]> {
    return this.fetch<string[]>('/products/categories');
  }

  async getByIds(ids: number[]): Promise<Product[]> {
    return Promise.all(ids.map(id => this.getById(id)));
  }

  async search(query: string): Promise<Product[]> {
    const all = await this.getAll();
    const q = query.toLowerCase();
    return all.filter(
      p => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  private async fetch<T>(path: string): Promise<T> {
    const res = await globalThis.fetch(`${this.baseUrl}${path}`);
    if (!res.ok) throw new Error(`FakeStore ${res.status}: ${path}`);
    return res.json() as Promise<T>;
  }
}
