## 2026-11-04

- Added an isolated `/form-preview` demo with two responsive columns: editable form title, name label, and message heading alongside an interactive live preview. Added a feature contract in `context/form-preview-contract.md`.
- Kept state in `useFormPreview`, composition in the feature entry, and presentation in prop-driven components. Settings are memory-only and reset on navigation/reload; this demo has no persistence or submission.
- Added an interaction test for live changes, preservation of preview input, and accessible fallback labels.
- Verification: all 3 test files / 8 tests passed; TypeScript, targeted ESLint, changed-file Prettier, and `git diff --check` passed. Full ESLint completed with 0 errors and 3 existing warnings. Repository-wide formatting reports 31 existing files. Production build and browser layout have not been verified.

## 2026-11-03

- Revised `agents/feature.md` into a standard feature contract, folder/responsibility map, prescribed runtime flows, dependency-ordered implementation process, complex todo workflow, tradeoff evaluation, and reusable AI task brief. Standardized the hook boundary in `agents/rules.md`; services remain conditional on domain logic. No application code changed.

- Added `agents/feature.md`, an AI implementation template based on todos with types, immutable store actions, selector-based hooks, UI wiring, optional services/API, and verification guidance. Aligned the rules' flow with direct store actions for simple operations; application code remains unchanged.

- Reformatted all 17 sections of `agents/new-rule.md` to follow heading, example, then Rules, with section separators; retained the existing guidance.

- Reviewed `agents/rules.md` and the todos feature's component, hook, service, Zustand store, types, constants, and empty API file.
- Created `agents/new-rule.md` as a concise proposed rules replacement with form-related examples, naming and import conventions, layer responsibilities, and an explicit state/API flow. Corrected import examples to match the root-based `@/` alias; preserved `agents/rules.md` and application code.

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
