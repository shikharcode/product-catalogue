# AI Usage Notes

## Tools and models

- **Claude Code** (claude-sonnet-4-6) via the CLI — primary tool for planning, scaffolding, and code generation
- Session ran in "ponytail" mode (lazy senior dev heuristic): favours the smallest complete change, defers abstractions until they're needed

## Agent instruction files

- [CLAUDE.md](CLAUDE.md) — project context and conventions committed to the repo

## Plan / spec

Before writing code I described the full architecture to Claude in one prompt:
- React + Node.js/Express, both TypeScript
- `ProductService` and `EmailService` as interfaces with swappable adapters
- MailHog in Docker for email (no paid service)
- Docker Compose for single-command start
- Dependency-injected routes so tests can pass mock services without HTTP mocking

Claude then built all files in parallel batches: backend foundation → services → routes → frontend components → tests → docs.

## Key prompts that shaped the solution

1. **"Build a product catalogue with React + Node.js..."** — establishing the full architecture before writing a line. Forcing an upfront design prevented the AI from making short-term decisions that would have required rewrites.

2. **"ProductService and EmailService as interfaces, FakeStoreProductService and NodemailerEmailService as adapters wired in index.ts"** — this was the critical architectural constraint. The AI's default would have been to call the Fake Store API directly in the route handlers. Making the interfaces explicit forced the swap-friendly design the brief asked for.

3. **"Use MailHog in Docker for email — no paid services"** — the AI suggested Resend and SendGrid before this prompt. MailHog satisfies the constraint without any account or API key.

4. **"Dependency-inject services into route factories so tests get mock implementations, not nock/fetch interceptors"** — resulted in `createProductsRouter(productService)` pattern, which kept test setup clean and fast.

5. **"Write category page split: top 3 by rating = featured, rest = additional"** — resolved the ambiguity in the acceptance criteria ("top rated products for that category AND additional products").

## Where the AI got something wrong

**`vi.mock` hoisting with named exports:** The initial test for `EnquiryModal` used `vi.spyOn(client.api, 'submitEnquiry')` after a `vi.mock('../api/client')` auto-mock call. This produced a type error because auto-mocking an object export returns `undefined` functions by default in Vitest. Fixed by passing an explicit factory to `vi.mock`: `vi.mock('../api/client', () => ({ api: { submitEnquiry: vi.fn() } }))`.

**`toHaveBeenCalledOnce()`:** Used this Vitest matcher in a backend Jest test. Jest doesn't have it. Caught during review and replaced with `toHaveBeenCalledTimes(1)`.

**Frontend build & peer dependencies:** `@vitejs/plugin-react` v4 conflicted with Vite 8 on a clean `npm install`, `npm test` launched Vitest in watch mode instead of exiting, and React Router v7 was passed deprecated v6 `future` flags. Caught during review and aligned.

## Time spent

| Phase    | Time    |
| -------- | ------- |
| Planning | 15 min  |
| Building | 90 min  |
| Testing  | 20 min  |
| Review   | 15 min  |
| **Total**| **~2h 20min** |
