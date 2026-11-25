# Backend

Express API. Product data and email sit behind interfaces so the routes never talk to Fake Store or SMTP directly.

## Commands

```bash
cd backend
npm install
npm start          # build, then node dist/index.js  →  http://localhost:3001
npm run dev        # tsx watch — restarts on file change
npm test           # Jest + Supertest
npm run build      # tsc → dist/
```

Needs MailHog on `:1025` if you want to see enquiry emails. From the repo root: `docker run -p 1025:1025 -p 8025:8025 mailhog/mailhog`. Defaults are in `src/config.ts`; copy `../.env.example` to `../.env` to override.

## Architecture

```
index.ts          wires FakeStoreProductService + NodemailerEmailService, starts listen
app.ts            createApp(productService, emailService) — tests inject mocks
routes/           createProductsRouter / createCategoriesRouter / createEnquiriesRouter
services/         IProductService, IEmailService + the two adapters
enums.ts          EnquiryStatus, SortDirection
types.ts          Product, EnquiryPayload, SmtpConfig, …
```

- `GET /api/products` — all products, or `?q=` search on title + description
- `GET /api/products/featured` — ids from `FEATURED_PRODUCT_IDS`
- `GET /api/products/:id` — one product
- `GET /api/categories` — category names
- `GET /api/categories/:category` — top 3 by rating, then the rest
- `POST /api/enquiries` — name, email, message → sales inbox
