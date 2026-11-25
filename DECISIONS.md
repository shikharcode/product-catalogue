# Decisions

## Assumptions

- **Home “top rated”** — operator config, not a user feature. `FEATURED_PRODUCT_IDS` (default `1,2,3,4,5`). Change the env var, not the code.
- **Category “top rated”** — sort by Fake Store `rating.rate` descending. Top 3 = Top Rated, rest = More Products.
- **Enquiry** — name, email, message. Product id and title come from the page. Sales inbox gets the email; the customer only sees “Thank you”.
- **Search** — case-insensitive match on title and description, on the server. Fake Store has no search API, so we fetch all 20 and filter.
- **`npm start` vs `npm run dev`** — `start` builds and runs. `dev` is watch/HMR. Compose uses `dev` so a reviewer gets live reload.

## Dropped

- Pagination — 20 products.
- Auth, cart, wishlist — not in the criteria.
- Full page tests — route tests + `ProductCard` / `EnquiryModal` cover the critical path.

## How this grows

- Product data: swap `FakeStoreProductService` for Postgres or Shopify in `index.ts`.
- Email: swap `NodemailerEmailService` for SES or SendGrid.
- Featured products: env var now → table + admin later.
- Look and feel: Tailwind utilities now → brand tokens in `tailwind.config.js` later.
- API client: `src/api/client.ts` is the one place for auth headers and error handling later.

## Next day

- Postgres behind `IProductService`
- Admin to pick featured products
- Customer confirmation email
- Pagination if the catalogue grows
- GitHub Actions for `npm test`
- Real SMTP (`SMTP_*`) for production
