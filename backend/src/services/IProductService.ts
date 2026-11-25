import { Product } from '../types';

/**
 * Strategy Pattern: product data source contract.
 * Current impl: FakeStoreProductService. Swap in index.ts for Postgres, Shopify, etc.
 */
export interface IProductService {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product>;
  getByCategory(category: string): Promise<Product[]>;
  getCategories(): Promise<string[]>;
  getByIds(ids: number[]): Promise<Product[]>;
  search(query: string): Promise<Product[]>;
}
