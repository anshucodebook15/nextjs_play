# Orders DataTable — Design System

## 1. Design Principles

- Clean, compact, professional admin UI.
- Prioritize readability and scanability.
- Use consistent spacing and typography.
- Avoid excessive borders, shadows, gradients, and colors.
- Use semantic colors only for status and actions.
- Desktop-first, responsive on smaller screens.
- Reuse existing UI primitives and design tokens.

---

## 2. Design Tokens

### Colors

```text id="v8h5qs"
Background
bg-background
bg-card
bg-muted

Text
text-foreground
text-muted-foreground

Border
border-border

Primary
bg-primary
text-primary-foreground

Destructive
bg-destructive
text-destructive-foreground

Success
text-green-600
bg-green-50

Warning
text-amber-600
bg-amber-50

Error
text-red-600
bg-red-50
```

Prefer semantic project tokens over hardcoded colors.

---

## 3. Typography

```text id="d7z5pd"
Page title
text-2xl font-semibold tracking-tight

Section title
text-lg font-semibold

Table header
text-xs font-medium text-muted-foreground

Table content
text-sm text-foreground

Secondary content
text-sm text-muted-foreground

Order ID
text-sm font-medium

Status
text-xs font-medium
```

Avoid unnecessary font weights.

---

## 4. Spacing

Use Tailwind's spacing scale.

```text id="h8j1qr"
Page padding       p-6
Section spacing    space-y-6
Toolbar spacing    gap-3
Table cell padding px-4 py-3
Card padding       p-6
Button spacing     gap-2
Filter spacing     gap-2
```

Default spacing should be multiples of `4`.

---

# 5. Page Layout

```tsx id="3b6n1c"
<div className="space-y-6 p-6">
  <header className="space-y-1">
    <h1 className="text-2xl font-semibold tracking-tight">
      Orders
    </h1>

    <p className="text-sm text-muted-foreground">
      Manage and monitor customer orders.
    </p>
  </header>

  <OrdersTable />
</div>
```

---

# 6. Table Container

Use a card-style container.

```tsx id="v2q7kz"
<div className="overflow-hidden rounded-lg border bg-card">
  ...
</div>
```

Do not use heavy shadows.

Preferred:

```text
rounded-lg border bg-card
```

Avoid:

```text
shadow-xl
rounded-2xl
```

unless the existing application design system requires it.

---

# 7. Toolbar

Structure:

```text id="3pjm4s"
┌───────────────────────────────────────────────────────┐
│ Search       Status       Date          Actions       │
└───────────────────────────────────────────────────────┘
```

Classes:

```tsx id="1c3d8m"
<div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
```

Search should take available width:

```tsx id="y3f1f4"
<div className="flex-1">
```

Filters:

```tsx id="q9p6k2"
<div className="flex flex-wrap items-center gap-2">
```

---

# 8. Search Input

```tsx id="k4p0vw"
<Input
  placeholder="Search orders..."
  className="h-9 w-full sm:max-w-sm"
/>
```

Recommended:

```text
h-9
w-full
sm:max-w-sm
```

Search icon:

```text
h-4 w-4 text-muted-foreground
```

---

# 9. Filter Controls

```tsx id="h2r8dm"
<Select>
  <SelectTrigger className="h-9 w-full sm:w-[160px]">
    ...
  </SelectTrigger>
</Select>
```

Rules:

- Height: `h-9`
- Use consistent widths.
- Keep filters compact.
- Use `gap-2`.

---

# 10. Table

Base:

```tsx id="q3n6zm"
<Table className="min-w-[900px]">
```

Wrap for horizontal scrolling:

```tsx id="0b7g9w"
<div className="overflow-x-auto">
  <Table />
</div>
```

---

# 11. Table Header

```tsx id="q8m1pd"
<TableHeader className="bg-muted/40">
```

Header cell:

```tsx id="x1g7km"
<TableHead className="h-11 px-4 text-xs font-medium text-muted-foreground">
```

Rules:

- Use subtle background.
- Avoid heavy borders.
- Header text should be smaller than body text.
- Header height: approximately `44px`.

---

# 12. Table Rows

```tsx id="k2s6qa"
<TableRow className="transition-colors hover:bg-muted/40">
```

Cells:

```tsx id="d9n4xz"
<TableCell className="px-4 py-3">
```

Rules:

- Use subtle hover state.
- Avoid dramatic row animations.
- Maintain consistent row height.
- Use `whitespace-nowrap` for IDs, dates, and actions.

---

# 13. Order ID

```tsx id="f5r2kc"
<span className="font-mono text-sm font-medium">
  #ORD-10291
</span>
```

Use monospace for technical identifiers when appropriate.

---

# 14. Customer Information

```tsx id="y7p1qe"
<div className="min-w-0">
  <p className="truncate text-sm font-medium">
    John Doe
  </p>

  <p className="truncate text-xs text-muted-foreground">
    john@example.com
  </p>
</div>
```

Rules:

- Customer name = primary text.
- Email = secondary text.
- Use `truncate` for long values.

---

# 15. Price

```tsx id="z6x4pc"
<span className="text-sm font-medium tabular-nums">
  ₹12,499
</span>
```

Use:

```text
tabular-nums
```

for numbers and currency values.

---

# 16. Status Badge

Statuses:

```text id="k7q2wd"
Pending
Confirmed
Shipped
Delivered
Cancelled
```

Base:

```tsx id="m4z8tx"
className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
```

Use semantic status tokens.

Example:

```text id="7c5q9h"
Pending
bg-amber-50 text-amber-700

Confirmed
bg-blue-50 text-blue-700

Shipped
bg-violet-50 text-violet-700

Delivered
bg-green-50 text-green-700

Cancelled
bg-red-50 text-red-700
```

Do not use color as the only indication of status.

---

# 17. Sortable Columns

Sortable header:

```tsx id="t3k8wp"
<button
  className="
    inline-flex
    items-center
    gap-1.5
    text-xs
    font-medium
    text-muted-foreground
    transition-colors
    hover:text-foreground
  "
>
```

Sort icon:

```text
h-3.5 w-3.5
```

Active sorting should use:

```text
text-foreground
```

Do not use large icons.

---

# 18. Row Actions

Use a compact icon button.

```tsx id="r6m2va"
<Button
  variant="ghost"
  size="icon"
  className="h-8 w-8"
>
```

Actions menu:

```text
View
Edit
Change Status
Delete
```

Destructive action:

```text
text-destructive
```

Do not use red for the entire action menu.

---

# 19. Pagination

Layout:

```tsx id="s4x8nj"
<div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
```

Information:

```text
text-sm text-muted-foreground
```

Example:

```text
Showing 21–40 of 248 orders
```

Pagination buttons:

```tsx id="p5c7rm"
<Button
  variant="outline"
  size="sm"
  className="h-8"
>
```

---

# 20. Loading State

Use skeletons rather than a full-page spinner.

```tsx id="q2w7mv"
<div className="space-y-3 p-4">
  <Skeleton className="h-10 w-full" />
  <Skeleton className="h-10 w-full" />
  <Skeleton className="h-10 w-full" />
</div>
```

For table loading, preserve the table structure where possible.

---

# 21. Empty State

```text id="m8r3vd"
┌─────────────────────────────────────────┐
│                                         │
│              No orders found            │
│                                         │
│     Try changing your search/filter.    │
│                                         │
└─────────────────────────────────────────┘
```

Classes:

```tsx id="w1p5ck"
<div className="flex min-h-[240px] flex-col items-center justify-center gap-2 p-6 text-center">
```

Title:

```text
text-sm font-medium
```

Description:

```text
text-sm text-muted-foreground
```

---

# 22. Error State

```text id="x9q4ms"
<div className="flex min-h-[240px] flex-col items-center justify-center gap-3 p-6 text-center">
```

Use:

```text
text-destructive
```

Provide a retry action.

```text
Try again
```

---

# 23. Responsive Design

Desktop:

```text
Full table
Filters inline
Pagination inline
```

Mobile:

```text
Horizontal table scroll
Filters wrap
Toolbar stacks
Pagination stacks
```

Use:

```text
flex-col
sm:flex-row
flex-wrap
overflow-x-auto
w-full
```

Do not hide important order information simply to avoid horizontal scrolling.

---

# 24. Focus & Accessibility

Interactive elements must have visible focus states.

Use:

```text
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

Rules:

- Buttons need accessible labels.
- Icon-only buttons require `aria-label`.
- Sort controls must be keyboard accessible.
- Dialogs must trap focus.
- Do not rely only on color.
- Maintain sufficient text/background contrast.

---

# 25. Motion

Keep animations subtle.

Preferred:

```text
transition-colors
transition-opacity
duration-150
```

Avoid:

```text
duration-700
animate-bounce
large scale animations
```

DataTables should feel fast and functional, not decorative.

---

# 26. Design Rules

### DO

```text
border
rounded-lg
bg-card
bg-muted/40
text-muted-foreground
hover:bg-muted/40
h-9
h-8
px-4
py-3
gap-2
```

### DON'T

```text
shadow-xl
rounded-[30px]
excessive gradients
large decorative icons
heavy borders
random spacing values
random colors
```

---

# 27. Component Responsibility

```text
OrdersTable
→ Compose table and coordinate state.

OrderFilters
→ Search and filter UI.

OrderTableRow
→ Render one order.

OrderActions
→ Row action menu.

EditOrderDialog
→ Edit order UI.

DeleteOrderDialog
→ Delete confirmation.

OrderStatusBadge
→ Display order status.

SortableHeader
→ Display sorting UI.
```

Do not mix these responsibilities.

---

# 28. Tailwind Priority

When styling the Orders DataTable, follow this priority:

```text
1. Existing design tokens
2. Existing UI components
3. Tailwind utility classes
4. Feature-specific classes
5. Custom CSS only when necessary
```

Avoid creating custom CSS when Tailwind utilities can solve the problem.

---

# 29. Visual Target

The final table should feel:

```text
Clean
Compact
Professional
Readable
Fast
Accessible
Consistent
```

The UI should communicate **data first, decoration second**.