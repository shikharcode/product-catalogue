export const config = {
  port: parseInt(process.env.PORT ?? '3001'),
  featuredProductIds: (process.env.FEATURED_PRODUCT_IDS ?? '1,2,3,4,5')
    .split(',')
    .map(Number)
    .filter(n => !isNaN(n)),
  fakeStoreBaseUrl: process.env.FAKE_STORE_BASE_URL ?? 'https://fakestoreapi.com',
  salesEmail: process.env.SALES_EMAIL ?? 'sales@example.com',
  smtp: {
    host: process.env.SMTP_HOST ?? 'localhost',
    port: parseInt(process.env.SMTP_PORT ?? '1025'),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER ?? '',
    pass: process.env.SMTP_PASS ?? '',
  },
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
};
