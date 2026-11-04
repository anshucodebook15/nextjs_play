# Order Feature — Codex Implementation Specification

## Objective

Implement the **Orders DataTable feature** using the existing `rules.md` naming and architecture conventions.

## Feature Structure

```text
features/orders/
├── components/
├── hooks/
├── api/
├── services/
├── schemas/
├── types/
├── utils/
├── constants/
└── tests/
```

Follow `rules.md` strictly.

## Orders DataTable

Create a production-ready Orders DataTable with:

- Server-side pagination
- Server-side sorting
- Search
- Status filter
- Date filter
- Row selection
- Select-all checkbox
- Loading state
- Empty state
- Error state
- Pagination controls
- Sort indicators
- Responsive layout

Columns:

```text
Order ID
Customer
Email
Total
Status
Created At
Actions
```

## Row Actions

Each row must support:

- View
- Edit
- Change status
- Delete

Use:

```text
OrderActions.tsx
EditOrderDialog.tsx
DeleteOrderDialog.tsx
```

Destructive actions must require confirmation.

## Architecture

Use this flow:

```text
OrdersPage
    ↓
OrdersTable
    ↓
Hooks
    ↓
API functions
    ↓
NestJS API
```

Keep responsibilities separated:

```text
components/ → UI
hooks/      → React state and feature logic
api/        → HTTP communication
services/   → business logic
schemas/    → runtime validation
types/      → TypeScript types
utils/      → pure helper functions
constants/  → shared feature constants
tests/      → tests
```

## API

Implement:

```text
GET    /orders
GET    /orders/:id
POST   /orders
PATCH  /orders/:id
DELETE /orders/:id
```

Orders list query:

```text
page
limit
search
status
sort
direction
dateFrom
dateTo
```

Example:

```text
/orders?page=1&limit=20&search=john&status=confirmed&sort=createdAt&direction=desc
```

Do not perform large-data sorting, filtering, or pagination on the client.

## Hooks

Create:

```text
useOrders.ts
useOrderFilters.ts
useOrderSort.ts
useOrderActions.ts
```

Hooks must not contain UI markup.

## Components

Create:

```text
OrdersTable.tsx
OrderTableRow.tsx
OrderFilters.tsx
OrderSearch.tsx
OrderStatusFilter.tsx
OrderActions.tsx
EditOrderDialog.tsx
DeleteOrderDialog.tsx
OrderStatusBadge.tsx
```

Reuse global UI components whenever available.

Do not create duplicate generic components inside the Orders feature.

## Schemas

Create:

```text
order.schema.ts
```

Validate:

- Order response
- Create order input
- Update order input
- Order query parameters
- Status values

Use Zod.

Generate TypeScript types from schemas where appropriate.

## Types

Create:

```text
order.types.ts
```

Use clear names:

```text
Order
OrderStatus
OrderItem
CreateOrderInput
UpdateOrderInput
OrderQuery
OrderResponse
```

## Services

Create:

```text
order.service.ts
```

Keep reusable business rules here.

Do not put React code inside services.

## URL State

Keep table state in URL query parameters where appropriate:

```text
page
limit
search
status
sort
direction
dateFrom
dateTo
```

Refreshing or sharing the URL must preserve the table state.

## Tests

Add tests for:

```text
OrdersTable.test.tsx
useOrders.test.ts
useOrderFilters.test.ts
useOrderSort.test.ts
order.service.test.ts
order.utils.test.ts
```

Test:

- Rendering
- Loading state
- Empty state
- Error state
- Search
- Filters
- Sorting
- Pagination
- Edit action
- Delete confirmation
- Successful update
- Failed API request

## Naming

Follow `rules.md` exactly.

```text
Components → PascalCase
Hooks      → useCamelCase
API        → camelCase
Services   → *.service.ts
Schemas    → *.schema.ts
Types      → *.types.ts
Utils      → *.utils.ts
Constants  → *.constants.ts
Tests      → matching filename + .test.ts/.test.tsx
```

Do not introduce alternative naming conventions.

## Code Quality

- Keep components small.
- Avoid duplicated logic.
- Avoid `any`.
- Use strict TypeScript.
- Handle loading/error/empty states.
- Keep business logic outside components.
- Keep API communication outside components.
- Reuse shared UI primitives.
- Follow existing project linting and formatting.
- Do not modify unrelated features.
- Do not add unnecessary dependencies.
- Follow existing project architecture before introducing new patterns.
