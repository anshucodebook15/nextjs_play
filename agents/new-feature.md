# New Feature Guide — Replicate Todos First

Before developing a new feature, replicate `src/features/todos/`: folders, filename patterns, exports, coding structure, and state flow. Then implement the requested behavior within those layers. This guide supersedes conflicting naming, scaffolding, and action-flow examples in `agents/feature.md` and `agents/rules.md` for new features.

Code examples below come only from todos or its route. Whitespace is normalized in places; omitted source lines are explicitly identified.

## Step 1 — Study the Actual Source

### Example

```text
src/features/todos/
  api/
    todo-api.ts
  components/
  constants/
    todo.constant.ts
  hooks/
    use-todo.ts
  services/
    todo.service.ts
  store/
    todo.store.ts
  types/
    todo.types.ts
  index.tsx

src/app/todo/page.tsx
```

### Rules

- Read every reference file and inspect every folder before scaffolding. Read project context and relevant installed Next.js guides before framework implementation.
- `api/todo-api.ts` is zero bytes; `components/` exists but has no files.
- The entry renders placeholder UI. Constants are not imported by the hook, service, store, or entry. There is no backend or persistence.
- Record the new feature's scope, actions, state, validation, and persistence before coding.
- Do not present missing functionality as an implemented todos example.

## Step 2 — Replicate the Skeleton Before Development

### Example

| Layer      | Actual path                  | Naming/export pattern                               |
| ---------- | ---------------------------- | --------------------------------------------------- |
| API        | `api/todo-api.ts`            | Singular stem + `-api.ts`; currently empty          |
| Components | `components/`                | Empty; no source component to copy                  |
| Constants  | `constants/todo.constant.ts` | Singular `.constant.ts`; uppercase named objects    |
| Hook       | `hooks/use-todo.ts`          | Singular `use-` filename; named `useTodos` function |
| Service    | `services/todo.service.ts`   | Named `todoService` object                          |
| Store      | `store/todo.store.ts`        | Named `useTodoStore` Zustand hook                   |
| Types      | `types/todo.types.ts`        | Named `Todo` and `TodoStore` interfaces             |
| Entry      | `index.tsx`                  | Default-exported `TodoFeature` arrow component      |

### Rules

- First create the equivalent seven folders and seven files, including `index.tsx`. Replace only resource-specific names; then begin behavior implementation.
- Use a plural resource feature folder and singular resource filename stem. Use kebab-case for multiword folder/stem names.
- Preserve `api`, `components`, `constants`, `hooks`, `services`, `store`, and `types` exactly.
- Preserve singular `.constant.ts`, `-api.ts`, and `use-` filenames. Do not switch to operation-named API files or camelCase hook filenames.
- Preserve singular `TodoFeature`, plural `useTodos`, camelCase `todoService`, and `useTodoStore` patterns for equivalent resource names.
- Keep the baseline API/components layers even when initially empty. Git does not track empty directories; do not invent reference component files or marker files.
- Add files for actual feature requirements and tests later without replacing this baseline.
- Use short relative imports internally and the configured `@/src/features/` alias from routes, as todos does.

## Step 3 — Define Resource and Store Interfaces

### Example

Source: `src/features/todos/types/todo.types.ts`.

```ts
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoStore {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  removeTodo: (id: string) => void;
}
```

### Rules

- Define interfaces in `.types.ts` before implementing their store.
- Keep state shape and action signatures explicit. Match action names and arguments across all layers.
- Use PascalCase interface names, camelCase fields/actions, and resource-specific types.
- Keep JSX, HTTP requests, and state mutation out of type files.

## Step 4 — Implement the Zustand State Owner

### Example

Source: `src/features/todos/store/todo.store.ts`.

```ts
import { create } from "zustand";
import { TodoStore } from "../types/todo.types";

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [
    {
      id: crypto.randomUUID(),
      title: "Learn Zustand",
      completed: false,
    },
  ],

  addTodo: (title) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
        },
      ],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));
```

### Rules

- Use typed Zustand `create`, exporting `use` + singular resource + `Store`.
- Store actions own immutable state updates through functional `set` callbacks.
- Append with spread; update with `map` and object spread; remove with `filter`.
- Generate new item IDs inside the add action. The reference also generates a seed ID at module initialization; use seed data only when required and follow installed Next.js rendering guidance.
- Keep shared resource data in this store instead of duplicating the collection in hook state.
- The store must not import its service, UI, or API layer.
- This source has no persistence middleware, loading/error state, or validation. Add required behaviors deliberately; do not claim they exist already.
- The sample preserves the original normal interface import. New code should use `import type` as required by project TypeScript standards.

## Step 5 — Implement the Service Facade

### Example

Source: `src/features/todos/services/todo.service.ts`.

```ts
import { useTodoStore } from "../store/todo.store";

export const todoService = {
  get todos() {
    return useTodoStore.getState().todos;
  },

  addTodo(title: string) {
    useTodoStore.getState().addTodo(title);
  },

  toggleTodo(id: string) {
    useTodoStore.getState().toggleTodo(id);
  },
};
```

### Rules

- Export a camelCase resource service object and retain this facade even for simple shared-state actions.
- Invoke store actions with `getState()`; do not call React hooks inside service methods.
- Keep immutable updates in the store. Add feature domain decisions to service methods as required.
- The getter returns an imperative snapshot; it does not subscribe React to updates.
- Todos does not expose removal through the service. Add required actions through every layer when developing the new feature.
- Do not bypass the service for simple shared-state mutations. This follows todos exactly and supersedes older optional-service guidance.

## Step 6 — Subscribe and Expose Actions Through the Hook

### Example

Source: `src/features/todos/hooks/use-todo.ts`.

```ts
"use client";
import { todoService } from "../services/todo.service";
import { useTodoStore } from "../store/todo.store";

export function useTodos() {
  const todos = useTodoStore((state) => state.todos);

  return {
    todos,
    addTodo: todoService.addTodo,
    toggleTodo: todoService.toggleTodo,
  };
}
```

### Rules

- Keep the client directive first, the singular `use-` filename, and plural exported hook name.
- Read reactive state with Zustand selectors; return selected data and service method references as one object.
- Keep mutations out of the hook; expose the service facade.
- Do not substitute a service getter or bare `getState()` read for a subscription.
- Todos exposes only add/toggle here. Store actions do not automatically become public hook actions.

## Step 7 — Preserve Constants and API Locations

### Example

Source: `src/features/todos/constants/todo.constant.ts` (its filename comment omitted).

```ts
export const TODO_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const TODO_FILTER = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};
```

API source: `src/features/todos/api/todo-api.ts` is empty; there is no implementation to quote.

### Rules

- Keep fixed values in the singular `.constant.ts` file using named uppercase object exports.
- The source comment says `todo.constants.ts`, but the actual filename is `todo.constant.ts`. Follow the actual filename.
- Define values appropriate to the new feature rather than copying unrelated todo priorities.
- Keep transport code in the singular `-api.ts` file. Leave it empty until backend behavior is required.
- Todos has no API imports, requests, response contracts, or remote runtime path. Do not invent one as a copied example.
- For required backend work, extend the service to coordinate the API; define validation, pending/error handling, and persistence explicitly. Do not put requests in UI or stores.

## Step 8 — Compose the Entry and Components

### Example

Source: `src/features/todos/index.tsx`.

```tsx
"use client";
import { useTodos } from "./hooks/use-todo";
const TodoFeature = () => {
  const { todos, addTodo, toggleTodo } = useTodos();

  console.log("Todos from store", todos);

  return <div>Lets Create a Feature For a todo App</div>;
};

export default TodoFeature;
```

### Rules

- Keep `index.tsx` as a client entry with a singular resource `Feature` arrow component and default export.
- Call the feature hook and destructure its public interface here.
- Develop requested presentation components inside `components/` and compose them from the entry with data/callback props.
- Components and entry must not import services, stores, or API functions directly.
- The reference has no component files to demonstrate their names or implementation. Apply the project's PascalCase component convention when adding real components.
- The log and placeholder above document the exact source. Replace them with requested UI; omit debugging and unused action bindings in completed code.

## Step 9 — Mount the Feature Through Its Public Entry

### Example

Source: `src/app/todo/page.tsx` (inactive commented import omitted).

```tsx
import TodoFeature from "@/src/features/todos";

const Page = () => {
  return (
    <div>
      <TodoFeature />
    </div>
  );
};

export default Page;
```

### Rules

- Import the default feature entry through the configured root alias.
- Keep the route thin; shared state and domain behavior stay inside the feature layers.
- Keep the interactive boundary in the entry. A route does not need a client directive merely to mount a client feature.

## Step 10 — Trace the Exact Runtime Flow

### Example

```text
READ
TodoFeature -> useTodos -> useTodoStore(state => state.todos)
-> subscribed todos returned to TodoFeature

ADD (when UI invokes the exposed action)
UI -> hook's addTodo -> todoService.addTodo(title)
-> useTodoStore.getState().addTodo(title)
-> set + array spread -> selector subscription -> updated UI

TOGGLE (when UI invokes the exposed action)
UI -> hook's toggleTodo -> todoService.toggleTodo(id)
-> useTodoStore.getState().toggleTodo(id)
-> set + map -> selector subscription -> updated UI

REMOVE IN CURRENT SOURCE
TodoStore contract -> store filter implementation
No service method -> no hook action -> no UI interaction

API / CONSTANTS IN CURRENT SOURCE
Present structurally; disconnected from runtime
```

### Rules

- Preserve writes through UI -> hook -> service -> store action -> immutable update -> subscribed UI.
- Preserve reads through UI -> hook -> store selector.
- Dependencies stay one-way: stores must not call their services.
- Complete every required action through all layers; an implementation in the store alone does not make it usable from UI.
- The current placeholder entry does not invoke the exposed actions. The add/toggle paths above describe what happens when those callbacks are invoked.
- In-memory state updates do not provide persistence or backend saving.

## Step 11 — Develop and Verify After Replication

### Example

```text
Inspect todos -> replicate folders/files/exports
-> define types -> implement store -> service -> hook
-> constants/API when needed -> components/entry -> route
-> verify requested interactions and declared persistence behavior
```

### Rules

- Finish the skeleton first, then implement one requested interaction at a time in dependency order.
- Preserve the reference facade, naming, exports, and store ownership throughout development.
- Apply product validation and error requirements; missing todos behavior is not an exemption from correctness.
- Follow agents/testing.md for test locations and commands. Todos has no tests to copy as source examples.
- Verify immutable transitions, reactive rendering, exposed actions, user interactions, and reload behavior.
- Run relevant tests, TypeScript, ESLint, and formatting checks. Report actual outcomes and unavailable checks.
- Update context/progress-tracker.md after meaningful changes. Do not refactor existing features merely to adopt this template.
