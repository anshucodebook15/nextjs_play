# Order Feature — Naming Convention Rules

## 1. Feature Folder

Use **kebab-case** for feature folders.

```text
features/
└── orders/
```

Rules:

- Feature name must be plural when representing a resource.
- Keep all order-related code inside `features/orders/`.
- Do not put order-specific code in global folders.

---

## 2. Feature Structure

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

Only create a folder when it is needed.

---

## 3. Components

Use **PascalCase**.

```text
OrdersTable.tsx
OrderTableRow.tsx
OrderFilters.tsx
OrderActions.tsx
EditOrderDialog.tsx
DeleteOrderDialog.tsx
OrderStatusBadge.tsx
```

Rules:

- One main component per file.
- Component name must match the filename.
- Use `Order` for a single order.
- Use `Orders` for a collection/list.
- Avoid generic names such as `Table.tsx` inside the feature.

```tsx
// Good
<OrderTableRow />

// Bad
<Row />
```

---

## 4. Hooks

Use **camelCase** and always start with `use`.

```text
useOrders.ts
useOrderSort.ts
useOrderFilters.ts
useOrderActions.ts
useOrderForm.ts
```

Rules:

- Hook names must describe what they manage.
- Hooks contain React-specific logic.
- Do not put pure business logic inside hooks.
- Do not create hooks for simple functions.

```ts
// Good
useOrderFilters();

// Bad
useOrderUtils();
```

---

## 5. API

Use **camelCase** for API files.

```text
api/
├── getOrders.ts
├── getOrder.ts
├── createOrder.ts
├── updateOrder.ts
└── deleteOrder.ts
```

Rules:

- Name API functions after the HTTP operation.
- API functions communicate with the backend.
- API files should not contain UI logic.
- API files should not contain complex business rules.

```ts
getOrders();
getOrder(id);
createOrder(data);
updateOrder(id, data);
deleteOrder(id);
```

---

## 6. Services

Use **dot notation** for service files.

```text
services/
└── order.service.ts
```

Rules:

- Services contain business/domain logic.
- Services should not contain React code.
- Services should not import React hooks.
- Keep business rules here when they are reusable or complex.

```ts
order.service.ts;

calculateOrderTotal();
canCancelOrder();
validateOrderStatus();
```

---

## 7. Schemas

Use **dot notation**.

```text
schemas/
└── order.schema.ts
```

Use schemas for validation and data contracts.

```ts
createOrderSchema;
updateOrderSchema;
orderQuerySchema;
```

Recommended library:

```text
Zod
```

---

## 8. Types

Use **dot notation**.

```text
types/
└── order.types.ts
```

Use types for TypeScript definitions.

```ts
Order;
OrderStatus;
OrderItem;
CreateOrderInput;
UpdateOrderInput;
OrderQuery;
```

Rules:

- Interfaces/types use **PascalCase**.
- Input types end with `Input`.
- Query types end with `Query`.
- Response types end with `Response`.

```ts
Order;
CreateOrderInput;
UpdateOrderInput;
OrderQuery;
OrderResponse;
```

---

## 9. Utils

Use **camelCase**.

```text
utils/
└── order.utils.ts
```

Use utilities for pure helper functions.

```ts
formatOrderStatus();
formatOrderDate();
calculateOrderItemTotal();
```

Rules:

- No React dependencies.
- No API calls.
- Functions should preferably be pure.

---

## 10. Constants

Use **dot notation**.

```text
constants/
└── order.constants.ts
```

Inside the file use `UPPER_SNAKE_CASE`.

```ts
ORDER_STATUSES;
MAX_ORDER_ITEMS;
DEFAULT_ORDER_PAGE_SIZE;
```

---

## 11. Tests

Use the same name as the file being tested.

```text
tests/
├── OrdersTable.test.tsx
├── useOrders.test.ts
├── useOrderSort.test.ts
├── order.service.test.ts
└── order.utils.test.ts
```

Rules:

```text
Component → Component.test.tsx
Hook      → Hook.test.ts
Service   → service.test.ts
Utility   → utils.test.ts
```

Use `.test.ts` or `.test.tsx` consistently.

---

## 12. Variables & Functions

Use **camelCase**.

```ts
orderId;
customerName;
totalAmount;
isLoading;

getOrders();
updateOrder();
calculateTotal();
```

Boolean variables should use:

```text
is...
has...
can...
should...
```

Examples:

```ts
isLoading;
isEditable;
hasPermission;
canCancel;
```

---

## 13. Types & Classes

Use **PascalCase**.

```ts
Order;
OrderStatus;
OrderItem;
CreateOrderInput;
OrderService;
```

---

## 14. Enums / Constants

Prefer union types for simple states:

```ts
type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
```

Use constants when values are reused:

```ts
export const ORDER_PAGE_SIZE = 20;
```

---

## 15. Files With Multiple Words

Use the convention based on the file type.

```text
Component → PascalCase
OrderTable.tsx

Hook → camelCase
useOrderFilters.ts

Service → dot notation
order.service.ts

Schema → dot notation
order.schema.ts

Types → dot notation
order.types.ts

Test → match source file
OrderTable.test.tsx
order.service.test.ts
```

---

## 16. Naming by Responsibility

| Responsibility | Naming                  |
| -------------- | ----------------------- |
| Page           | `page.tsx`              |
| Component      | `OrderTable.tsx`        |
| Hook           | `useOrders.ts`          |
| API            | `getOrders.ts`          |
| Service        | `order.service.ts`      |
| Schema         | `order.schema.ts`       |
| Types          | `order.types.ts`        |
| Utils          | `order.utils.ts`        |
| Constants      | `order.constants.ts`    |
| Component test | `OrderTable.test.tsx`   |
| Hook test      | `useOrders.test.ts`     |
| Service test   | `order.service.test.ts` |

---

## 17. Import Rules

Prefer absolute imports:

```ts
import { OrdersTable } from "@/features/orders/components/OrdersTable";
```

Avoid deep relative imports:

```ts
// Avoid
import { Button } from "../../../../components/ui/Button";
```

Use aliases:

```text
@/components
@/features
@/lib
@/hooks
@/utils
```

---

## 18. Dependency Rules

Follow this direction:

```text
components
    ↓
hooks
    ↓
api / services
    ↓
backend
```

Rules:

- Components may use hooks.
- Hooks may use API functions.
- Services may contain business logic.
- API functions may call the backend.
- Services must not import React components.
- Utils must not depend on React.
- Feature code must not depend on another feature's internal files.

---

## 19. Reuse Rule

If code is only used by Orders:

```text
features/orders/
```

If code is reused by multiple features:

```text
components/
hooks/
utils/
lib/
```

Do not move code to global folders prematurely.

**Keep feature-specific code inside the feature.**

---

## 20. Golden Rule

```text
UI        → components/
React     → hooks/
API       → api/
Business  → services/
Validate  → schemas/
Types     → types/
Helpers   → utils/
Constants → constants/
Tests     → tests/
```

### Example Final Structure

```text
features/orders/
│
├── components/
│   ├── OrdersTable.tsx
│   ├── OrderTableRow.tsx
│   ├── OrderFilters.tsx
│   ├── OrderActions.tsx
│   ├── EditOrderDialog.tsx
│   └── OrderStatusBadge.tsx
│
├── hooks/
│   ├── useOrders.ts
│   ├── useOrderSort.ts
│   ├── useOrderFilters.ts
│   └── useOrderActions.ts
│
├── api/
│   ├── getOrders.ts
│   ├── getOrder.ts
│   ├── createOrder.ts
│   ├── updateOrder.ts
│   └── deleteOrder.ts
│
├── services/
│   └── order.service.ts
│
├── schemas/
│   └── order.schema.ts
│
├── types/
│   └── order.types.ts
│
├── utils/
│   └── order.utils.ts
│
├── constants/
│   └── order.constants.ts
│
└── tests/
    ├── OrdersTable.test.tsx
    ├── useOrders.test.ts
    ├── useOrderSort.test.ts
    ├── order.service.test.ts
    └── order.utils.test.ts
```
