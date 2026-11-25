# Frontend

React 18 + Vite + Tailwind. All HTTP goes through `src/api/client.ts`. The backend must be on `:3001`.

## Commands

```bash
cd frontend
npm install
npm start          # build, then vite preview  →  http://localhost:5173
npm run dev        # Vite HMR — no production build
npm test           # Vitest + Testing Library (once)
npm run test:watch
npm run build      # tsc + vite build → dist/
npm run lint
```

`/api/*` is proxied to `http://localhost:3001` (or `VITE_API_URL` in Docker).

## Architecture

```
App.tsx           routes: /  /category/:category  /search  /products/:id
Layout.tsx        search bar + category links
pages/            HomePage, CategoryPage, SearchPage, ProductPage
components/       ProductCard, EnquiryModal
api/client.ts     getFeatured, getProduct, searchProducts, getCategories, submitEnquiry
enums.ts          EnquiryStatus, SubmitState
types.ts          Product, CategoryResult, EnquiryPayload, …
```

- Home — five featured products
- Category — top rated (3) then more products
- Search — submit the form, results for `?q=`
- Product — details + Enquire → thank-you
