import { EnquiryStatus } from './enums';

export { EnquiryStatus, SortDirection } from './enums';

export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface CategoryResult {
  category: string;
  featured: Product[];
  additional: Product[];
}

export interface EnquiryPayload {
  productId: number;
  productTitle: string;
  name: string;
  email: string;
  message: string;
}

export interface EnquiryResponse {
  status: EnquiryStatus;
}

export interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}
