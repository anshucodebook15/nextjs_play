# Form Builder Feature Rules

For new features, `agents/new-feature.md` supersedes conflicting filename, scaffolding, entry export, and action-flow examples below. Replicate the todos skeleton first, including the service facade for shared-state actions. Other coding, validation, and testing standards still apply.

---

## 1. Feature Folder

Use **kebab-case** for feature folders.

```text
src/features/
  forms/
```

Rules:

- Use kebab-case for folders and plural names for resources: `src/features/forms/`.
- Keep form-specific code inside the feature. Move code to shared folders only when multiple features need it.
- Keep route files thin: compose feature UI rather than placing builder logic in routes.

---

## 2. Feature Structure

```text
src/features/forms/
  index.tsx
  components/FormsTable.tsx
  hooks/useForms.ts
  api/getForms.ts
  services/form.service.ts
  store/form.store.ts
  schemas/form.schema.ts
  types/form.types.ts
  utils/form.utils.ts
  constants/form.constants.ts
  tests/form.service.test.ts
```

Rules:

- `index.tsx` composes and exports the feature entry component, such as `FormsFeature`.
- Do not create empty folders or placeholder files for future functionality.
- Each layer owns one responsibility; avoid repeating logic across layers.

---

## 3. Components

Use **PascalCase** for components.

```text
FormCanvas.tsx
FieldSettings.tsx
FormsTable.tsx
DeleteFormDialog.tsx
```

Rules:

- Use PascalCase for filenames and component names: `FormCanvas.tsx`, `FieldSettings.tsx`, `FormsTable.tsx`.
- Match the main component name to its filename; keep one main component per file.
- Use singular names for one item (`FormCard`) and plural names for collections (`FormsTable`).
- Components render UI and handle presentation events. Delegate reusable state logic to hooks and domain operations to services.
- Use descriptive names such as `DeleteFormDialog`, rather than `Dialog`.

---

## 4. Hooks

Use **camelCase** names starting with `use`.

```text
useForms.ts
useFormBuilder.ts
useFormActions.ts
```

Rules:

- Use camelCase filenames and functions starting with `use`: `useForms.ts`, `useFormBuilder.ts`, `useFormActions.ts`.
- Hooks connect React components to state, services, and API operations; expose relevant data, actions, and loading/error states.
- Subscribe to only the store state the component needs.
- Keep pure helpers outside hooks. Do not create a hook for a function that uses no React behavior.

---

## 5. API

Use **camelCase** filenames matching the API operation.

```text
api/
  getForms.ts
  getForm.ts
  createForm.ts
  updateForm.ts
  publishForm.ts
```

Rules:

- Use camelCase filenames matching the exported operation: `getForms.ts`, `getForm.ts`, `createForm.ts`, `updateForm.ts`, `publishForm.ts`.
- API functions own backend requests, request/response handling, and transport errors.
- Name functions by intent: `getForm(formId)`, `updateForm(formId, input)`, `unpublishForm(formId)`.
- Keep JSX, React state, store mutations, notifications, and business rules out of API files.
- Feature API clients belong here; framework route handlers remain in the application's route structure.

---

## 6. Services

Use **dot notation** for service files.

```text
services/
  form.service.ts
```

Rules:

- Use dot notation: `form.service.ts`; exported service objects use camelCase: `formService`.
- Services own domain rules and coordinated actions, such as `duplicateField`, `saveDraft`, and `publishForm`.
- Services may call API functions and access a client store through `getState()` when coordinating client actions.
- Do not call React hooks or import UI components in services. A Zustand store's `getState()` is imperative access, not a hook call.
- Keep client store access out of server code. Pure domain functions should accept data explicitly so they can run without a store.
- Saving updates the draft. Publishing validates and creates a separate published version; draft edits must not mutate that version.

---

## 7. Schemas

Use **dot notation** for schema files.

```text
schemas/
  form.schema.ts
```

Rules:

- Use dot notation: `form.schema.ts`; schema identifiers use camelCase with a `Schema` suffix.
- Use Zod for runtime validation: `createFormSchema`, `formFieldSchema`, `publishFormSchema`.
- Validate external data at boundaries. Put reusable data constraints in schemas and coordinated business decisions in services.
- Infer TypeScript types from schemas when they describe the same data contract.

---

## 8. Types

Use **dot notation** for type files.

```text
types/
  form.types.ts
```

Rules:

- Use dot notation: `form.types.ts`.
- Use PascalCase: `FormDefinition`, `FormField`, `FormStatus`, `FormStore`.
- Use responsibility suffixes: `CreateFormInput`, `UpdateFormInput`, `FormQuery`, `FormResponse`, `FormCanvasProps`.
- Use `import type` for type-only dependencies. Avoid duplicate definitions and `any`.

---

## 9. Utils

Use **dot notation** for utility files and **camelCase** for functions.

```text
utils/
  form.utils.ts
```

Rules:

- Use dot notation for grouped utility files: `form.utils.ts`; exported functions use camelCase.
- Keep helpers pure and focused: `formatFormDate`, `createFieldName`, `reorderFields`.
- Utilities must not import React, access stores, make API calls, or mutate their inputs.
- Put form publishing rules in services rather than generic utilities.

---

## 10. Constants

Use **dot notation** for constant files.

```text
constants/
  form.constants.ts
```

Rules:

- Use dot notation: `form.constants.ts`.
- Use UPPER_SNAKE_CASE for shared fixed values: `FORM_STATUSES`, `FIELD_TYPES`, `DEFAULT_FORM_TITLE`.
- Keep feature constants inside the feature and avoid unexplained repeated literals.
- Do not invent product limits solely to create constants.

---

## 11. Tests

Match test filenames to the source files.

```text
tests/
  FormCanvas.test.tsx
  useFormBuilder.test.ts
  form.service.test.ts
  form.utils.test.ts
```

Rules:

- Put tests in `src/features/forms/tests/` and match the source filename:
  - `FormCanvas.test.tsx`
  - `useFormBuilder.test.ts`
  - `form.service.test.ts`
  - `form.utils.test.ts`
- Use `.test.tsx` for JSX and `.test.ts` otherwise.
- Test observable behavior and domain rules, including draft/published separation, validation, and state updates.
- Follow `agents/testing.md` for tooling, setup, discovery patterns, and validation commands.

---

## 12. Variables & Functions

Use **camelCase** for variables and functions.

```ts
const formId = "contact";
const hasUnsavedChanges = true;

function handlePublish() {
  onPublish(formId);
}
```

Rules:

- Use camelCase: `formId`, `selectedFieldId`, `formTitle`.
- Name functions with verbs: `addField`, `saveDraft`, `publishForm`.
- Prefix booleans with `is`, `has`, `can`, or `should`: `isPublished`, `hasUnsavedChanges`, `canPublish`.
- Use `handlePublish` for a component event handler and `onPublish` for a callback prop.
- Avoid vague names such as `data`, `item`, or `process` when a domain name is clearer.

---

## 13. Types & Classes

Use **PascalCase** for types and classes.

```ts
type FormStatus = "draft" | "published";

interface FormCanvasProps {
  formId: string;
}
```

Rules:

- Use PascalCase for types, interfaces, classes, and enums: `FormDefinition`, `FormField`, `FormService`.
- Do not prefix interfaces with `I` or types with `T`.
- Prefer functions or plain objects for services; introduce classes only when needed.

---

## 14. Enums / Constants

Prefer union types for simple states and constants for runtime values.

```ts
export const FORM_STATUSES = ["draft", "published"] as const;
export type FormStatus = (typeof FORM_STATUSES)[number];
```

Rules:

- Prefer string unions for simple states: `type FormStatus = "draft" | "published"`.
- When runtime values are also needed, use an `as const` object or array and derive the union from it.
- Use PascalCase for enum names if an enum is necessary, and UPPER_SNAKE_CASE for exported constant objects.
- Ordinary local `const` variables still use camelCase.

---

## 15. Naming by Responsibility

Name files by their responsibility.

| Responsibility | Example                          | Owns                                  |
| -------------- | -------------------------------- | ------------------------------------- |
| Route          | `page.tsx`                       | Route composition                     |
| Feature entry  | `index.tsx` / `FormsFeature`     | Feature composition                   |
| Component      | `FormCanvas.tsx`                 | UI                                    |
| Hook           | `useFormBuilder.ts`              | React subscriptions and orchestration |
| API            | `getForms.ts`                    | Backend communication                 |
| Service        | `form.service.ts`                | Domain rules and actions              |
| Store          | `form.store.ts` / `useFormStore` | Shared client state and state updates |
| Schema         | `form.schema.ts`                 | Runtime validation                    |
| Types          | `form.types.ts`                  | TypeScript contracts                  |
| Utils          | `form.utils.ts`                  | Pure helpers                          |
| Constants      | `form.constants.ts`              | Fixed reusable values                 |
| Test           | `FormCanvas.test.tsx`            | Source behavior verification          |

Rules:

- Apply the matching filename convention for each responsibility, including multiword names.
- Keep each file focused on the responsibility listed above.

---

## 16. Import Rules

Use the configured alias for imports across folders.

```ts
import { FormCanvas } from "@/src/features/forms/components/FormCanvas";
import type { FormDefinition } from "@/src/features/forms/types/form.types";
```

Rules:

- Follow `tsconfig.json`: `@/` currently maps to the repository root, so feature imports use `@/src/features/...`.
- Prefer absolute imports across folders; short relative imports within a feature are allowed. Avoid deep `../../../` paths.
- Group imports as external packages, shared project code, feature code, then types; keep type-only imports explicit.
- Avoid circular dependencies. Internal feature files must not import their own entry point.
- Do not import another feature's internal files. Expose an intentional public entry point or extract genuinely shared code.

---

## 17. State & Execution Flow

The todos example subscribes through a hook and delegates actions to a service that updates Zustand. Apply that separation to forms:

```text
Read:   component -> hook -> store subscription -> UI update
Action: component -> hook -> store action
Domain: component -> hook -> service -> store action and/or API
Remote: hook or service -> API -> backend
```

Rules:

- Keep simple component-only state local. Use `store/form.store.ts` for shared builder state such as draft fields and the selected field ID.
- Store actions own immutable state updates; services own domain decisions. Do not duplicate either responsibility in components.
- Hooks may call API functions directly for simple requests; use a service when domain rules or multiple steps are involved.
- Simple actions may go directly from hooks to the store. Do not add a service that only forwards calls; see `agents/feature.md` for the implementation template.
- For interactive features, use the feature hook as the UI boundary. Components receive data and callbacks rather than importing stores, services, or API functions directly.
- Do not make store actions call services that depend on the same store; keep dependencies one-way.
- Store access does not provide persistence. Draft saving and publishing require an explicit persistence implementation.
- The todos API file is empty and its UI is a placeholder; they demonstrate no completed backend or form behavior.
- Existing todos names (`use-todo.ts`, `todo-api.ts`, `todo.constant.ts`) are legacy examples. New form code follows the conventions above.
