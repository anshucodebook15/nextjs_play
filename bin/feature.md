# Standard Feature Template for AI

For new features, follow `agents/new-feature.md` first. Its exact todos filenames, baseline scaffolding, default singular feature entry, and hook -> service -> store mutation flow supersede conflicting examples and optional-service guidance below. The remaining responsibility, product correctness, and verification guidance still applies.

---

## 1. Write the Feature Contract

Example:

```text
Feature folder: todos
Domain name: Todo
Feature entry: TodosFeature
Hook: useTodos
State owner: useTodoStore
Actions: addTodo, toggleTodo, removeTodo
Persistence: client memory
Acceptance: valid additions appear; toggling updates completion; removal deletes the item
```

Rules:

- Read description.md, rules.md, testing.md, and applicable repository instructions before implementation.
- Read the relevant installed Next.js guide in node_modules/next/dist/docs/ before framework implementation.
- Write this contract before code. Include validation, errors, persistence, and the current development phase.
- For another resource, replace `todos`, `Todo`, and `Todos` consistently; for forms use `forms`, `Form`, and `Forms`.
- Define the source of truth for each state value. Distinguish client state, server data, and component-only state.

---

## 2. Use the Standard Folder Map

Example:

```text
src/features/todos/
  index.tsx
  components/
    TodoList.tsx
    TodoListItem.tsx
    CreateTodoForm.tsx
  hooks/
    useTodos.ts
  services/
    todo.service.ts
  store/
    todo.store.ts
  api/
    getTodos.ts
    updateTodo.ts
  schemas/
    todo.schema.ts
  types/
    todo.types.ts
  utils/
    todo.utils.ts
  constants/
    todo.constants.ts
  tests/
    TodoList.test.tsx
    useTodos.test.ts
    todo.service.test.ts
    todo.store.test.ts
```

Rules:

- This map fixes where responsibilities belong. Create a file only when the current feature needs that responsibility.
- Every interactive feature has an entry and a hook as its UI-facing interface. Components receive data and callbacks through props.
- Components and the feature entry must not import stores, services, or API functions directly; use the feature hook.
- Keep route files focused on mounting the feature. Shared UI belongs outside the feature only when genuinely reused.
- Follow rules.md for naming and imports. The existing todo filenames are not the naming template.

---

## 3. Assign Each Responsibility Once

Example:

| Layer | Owns | Must not own |
| --- | --- | --- |
| Feature entry | Hook connection and component composition | Business rules, requests |
| Components | Rendering, input events, local presentation state | Store access, domain workflows |
| Hook | Reactive subscriptions, UI action interface, request feedback | Reusable domain decisions |
| Service | Domain policies and multi-step operations | JSX, React hooks, toast rendering |
| Store | Shared client state and immutable updates | HTTP requests, workflow orchestration |
| API | Requests, response handling, transport errors | Store mutation, UI feedback |
| Schemas | Runtime input/output validation | Network calls, state changes |
| Types | Compile-time contracts | Runtime operations |
| Utils | Pure transformations | React, stores, requests |
| Constants | Reused fixed values | Mutable application state |

Rules:

- Do not repeat a rule in multiple layers. UI validation can provide early feedback, but server validation remains authoritative for backend operations.
- Keep input text and temporary component-only UI state local; use the store for shared builder state.
- Use the existing query approach for server data when applicable. Do not create competing copies in a query cache and Zustand.
- Types, schemas, utils, and constants must not depend on higher layers.

---

## 4. Follow the Exact Runtime Flows

Examples:

```text
READ
entry -> hook -> store selector -> data passed to components

SIMPLE CLIENT ACTION
component callback -> entry/hook -> store action
-> immutable state update -> hook subscription -> updated UI

SIMPLE REMOTE REQUEST
component callback -> entry/hook -> API -> backend
-> hook updates the designated state/cache -> updated UI

COMPLEX DOMAIN ACTION
component callback -> entry/hook -> service
-> validate domain preconditions
-> API when persistence is required
-> commit successful result to designated state/cache
-> return result to hook -> feedback and updated UI
```

Rules:

- Classify each action before implementing it. Use these flows consistently; do not let individual components choose their own architecture.
- Simple means a direct state transition or one request without additional domain decisions. Use a service when business policy or coordinated steps are involved.
- Hooks are always the interactive UI boundary. A service is not mandatory for simple actions.
- Services may access a client store through getState() for coordination. They must not call React hooks; stores must not call services that depend on them.
- Assign successful state/cache updates to one owner per operation: the hook for simple requests or the service for coordinated operations. Do not update the same result in both.
- React reads use subscriptions. Imperative getState() reads alone do not make UI reactive.
- Keep client singleton stores out of server request code. Apply installed framework guidance to initialization and rendering boundaries.

---

## 5. Build in Dependency Order

Example:

```text
Contract -> Types/Schemas -> Pure helpers -> Store/API
-> Service if needed -> Hook -> Components/Entry -> Route -> Verification
```

Rules:

- Define action inputs and results first. Infer types from schemas when they represent the same contract.
- Implement immutable state transitions and transport functions independently.
- Implement domain operations after their dependencies; expose them through the hook afterward.
- Add the UI only after its data and action interface is clear.
- Implement one complete user interaction at a time. This order does not require building all future API files or services first.

---

## 6. Apply the Template to Simple Todos

Example hook contract:

```ts
const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
```

Example implementation responsibilities:

```text
Todo types: id, title, completed; action input contracts
Store: todos; addTodo; toggleTodo; removeTodo
Hook: select todos and required actions from the store
Entry: call useTodos and pass data/callbacks to UI
Components: render list and input, emit user actions
```

Rules:

- Store actions append, map, or filter without mutating existing state.
- Reject blank titles and generate IDs when adding items, not during rendering.
- Expose removal when it is part of the requested UI; the existing useTodos hook omits it.
- Do not create a service merely to forward addTodo or toggleTodo to the store.
- Do not copy the empty API file, unused constants, placeholder UI, or debug logs.
- Declare that memory-only todos reset on reload. Persistence must be explicitly implemented.

---

## 7. Extend the Same Flow for Complex Logic

Example: a hypothetical persisted todo feature allows completion only after all subtasks are complete. This illustrates architecture, not an additional project requirement.

```text
1. TodoListItem emits onComplete(todoId).
2. Hook starts pending feedback and calls todoService.completeTodo(todoId).
3. Service reads current data and checks the subtask completion rule.
4. Invalid operation returns a defined domain error; no API call or state update occurs.
5. Valid operation calls updateTodo(todoId, input).
6. API sends the request and validates the returned contract.
7. Service commits the confirmed result to its designated state owner.
8. Hook clears pending feedback and exposes success or error to UI.
```

Rules:

- Services own the business decision; the API function owns transport; store actions own state transitions.
- The hook owns UI-facing pending and error state. Clear pending state on both success and failure.
- Preserve previous state when a request fails. An optimistic approach requires an explicit rollback strategy.
- Prevent duplicate/conflicting mutations for the same resource while pending, or define how ordering is resolved.
- Backend operations must enforce domain rules too; a client service cannot guarantee consistency across users.
- A complex local-only workflow follows the same process without the API step.
- For form publishing, substitute draft validation, published-version creation, persistence, and confirmation; editing a draft must not mutate the published version.

---

## 8. Understand the Benefits and Costs

Example evaluation:

| Choice | Why it helps | Cost or failure mode |
| --- | --- | --- |
| Consistent hook boundary | UI consumers have one predictable interface | Small features need a thin adapter |
| Separate store updates | State transitions are easy to inspect and test | A store adds overhead for component-only state |
| Domain service | Complex rules stay out of UI and can be tested independently | Forwarding-only methods add navigation without useful behavior |
| Separate API files | Backend changes stay localized | Empty wrappers and speculative endpoints add clutter |
| Feature-local folders | Related changes stay together | Excessive tiny files make navigation harder |
| Imperative service/store access | Fits the existing todo coordination style | Tighter coupling requires state reset or dependency isolation in tests |

Rules:

- This pattern is good when boundaries reduce duplicated logic and make actions predictable.
- It becomes harmful when every click must pass through empty layers or all state is pushed into a global store.
- The existing todo separation is a useful starting point, but its forwarding service does not demonstrate complex domain logic.
- Keep the UI boundary consistent while adding services only for real responsibilities. Do not interpret every folder in the map as mandatory.

---

## 9. Verify the Complete Flow

Example checks:

```text
Store: add/toggle/remove produce correct immutable transitions
Service: invalid precondition blocks mutation; failure preserves state
Hook/UI: loading clears; actions update visible data; errors are shown
Persistence: reload behavior matches the declared requirement
```

Rules:

- Follow testing.md for test locations, setup, and commands. Test behavior, not merely forwarding calls.
- For complex operations, cover success, invalid input, API failure, and relevant concurrency behavior.
- Verify accessible inputs, empty states, destructive confirmations, and unsaved-change behavior where required.
- Run the relevant tests, typecheck, lint, and formatting checks; report actual outcomes and unavailable checks.
- Update context/progress-tracker.md after meaningful changes. Report completed behavior, remaining issues, and the next phase.

---

## 10. Copy This Brief for the Next Feature

Example AI task template:

```text
Implement <feature> using agents/feature.md and agents/rules.md.

Resource: <singular PascalCase> / <plural folder name>
Current phase and scope: <what to build now>
User interactions: <actions and expected outcomes>
State ownership: <local UI / shared client state / server data>
Persistence: <none or defined backend contract>
Validation and domain rules: <constraints>
Action classification: <simple local / simple remote / complex domain>
Complex workflow: <ordered steps, success, failure, concurrency>
Acceptance criteria: <observable behavior>

Use the hook as the UI boundary. Keep state updates in the store,
transport in API files, and complex domain logic in services.
Create only required files, verify the flow, and update the tracker.
```

Rules:

- Fill in the brief before implementation; resolve material ambiguity using existing project context first.
- Keep the same responsibility map and flows across features.
- Do not refactor the existing todos feature or add hypothetical functionality unless requested.
