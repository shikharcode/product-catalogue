import { EnquiryStatus } from './enums';

export { EnquiryStatus, SubmitState } from './enums';

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

export interface EnquiryFormValues {
  name: string;
  email: string;
  message: string;
}

export interface EnquiryPayload extends EnquiryFormValues {
  productId: number;
  productTitle: string;
}

export interface EnquiryResponse {
  status: EnquiryStatus;
  error?: string;
}
