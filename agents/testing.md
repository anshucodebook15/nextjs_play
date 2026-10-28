# Testing

- Run `npm run test:run` for a single Vitest run or `npm test` for watch mode.
- Run `npm run typecheck` for TypeScript, `npm run lint` for ESLint, and `npm run format:check` for formatting.
- Vitest uses jsdom, React Testing Library, user-event, and jest-dom matchers.
- Put feature tests in `src/features/<feature>/tests/`, matching the source filename with `.test.ts` or `.test.tsx`.
- Import test APIs explicitly from `vitest`. DOM cleanup runs after every test.
- TypeScript aliases come from `tsconfig.json`; `@/` currently maps to the repository root.
- Vitest discovers only `src/**/*.test.{ts,tsx}`. Future browser tests belong outside this pattern.
- Use browser tests for async Server Components. Playwright is not installed yet.
