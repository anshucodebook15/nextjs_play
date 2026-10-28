## 2026-10-28

- Added the `/pix` App Router route in `src/app/pix/page.tsx` with a default-exported `PixPage` component.
- Added a responsive Pix contact form with name, email, and message fields, accessible validation errors, and local submission feedback.
- Kept form UI in `src/features/pix/components/`, React state in `hooks/`, and Zod validation in `schemas/`, using existing React Hook Form and Zod dependencies. No backend submission or persistence is configured.
- Verification: `git diff --check` passed. Lint, formatting, and TypeScript execution are unavailable because Node.js/npm/npx are not on the shell PATH; browser behavior has not been verified.
- Diagnosed tooling access: PATH is correct; Node 24.14.0 and npm 11.9.0 work outside the sandbox, which restricts the NVM installation.
- Added Vitest/jsdom configuration, React Testing Library cleanup and matchers, test/typecheck scripts, and Pix form/schema tests. Testing conventions are documented in `agents/testing.md`.
- Installed testing dependencies and aligned `@types/node` with the Node 24 runtime. Initial verification: 2 test files and all 7 tests passed; project TypeScript check passed; changed files were formatted with Prettier. npm reported 13 dependency vulnerabilities (1 low, 2 moderate, 8 high, 2 critical); dependency remediation remains separate.
- ESLint passed for the Pix feature, route, and Vitest configuration/setup. `git diff --check` passed. Production build and browser tests have not been run in this setup step.
- Added `agents/testing.md` as the third required reading item in `AGENTS.md`, followed by the Git workflow guide.
