# Form Builder — Project Description & Implementation Guide

## 1. Project Overview

Build a **dynamic Form Builder application** using Next.js that allows users to create, customize, preview, save, and publish forms through an intuitive visual interface.

The primary goal is to provide a simple, flexible, and reliable form-building experience without requiring users to write code.

The application focuses on two core functionalities:

1. **Form Building** — Creating and customizing forms.
2. **Form Publishing** — Making completed forms publicly accessible through shareable URLs.

All technical architecture, naming conventions, folder structures, and coding standards must follow `rules.md`.

## 2. User Interaction Flow

The complete user journey must follow this sequence:

**Forms Dashboard → Create Form → Form Builder → Preview → Save → Publish → Public Form**

### Step 1 — Forms Dashboard

Users can:

- View all created forms.
- Create a new form.
- Open and edit existing forms.
- Identify draft and published forms.
- Delete forms with confirmation.
- Access the public link of published forms.

### Step 2 — Create Form

When users create a new form:

- A new form opens in the builder.
- Users can enter the form title and description.
- The form initially contains no fields.
- Users can begin adding fields.

### Step 3 — Form Builder

The builder must provide three main sections:

**Field Palette**

Displays available fields:

- Text
- Email
- Number
- Textarea
- Dropdown
- Radio
- Checkbox
- Date

**Form Canvas**

Users can:

- Add fields.
- Select fields.
- Reorder fields using drag and drop.
- Duplicate fields.
- Remove fields.
- See changes immediately.

**Field Settings**

Users can configure:

- Field label.
- Field name.
- Placeholder.
- Required or optional status.
- Available options for choice-based fields.

All changes must immediately reflect in the form canvas.

### Step 4 — Form Preview

Users can:

- Preview the complete form.
- Interact with fields as an end user.
- Check required-field validation.
- Return to editing without losing changes.

Preview must accurately represent the published form experience.

### Step 5 — Save Form

Users can:

- Save the current form as a draft.
- Continue editing previously saved forms.
- Reopen saved forms without losing configuration.

Saving a form must not automatically publish it.

### Step 6 — Publish Form

Users can:

- Publish a valid form.
- Receive a unique shareable URL.
- Copy and share the public URL.
- Unpublish an existing form.
- Edit a published form without immediately changing its live version.
- Republish to make the latest changes publicly available.

### Step 7 — Public Form

Visitors accessing a published form can:

- View the form title and description.
- Interact with all configured fields.
- See required-field validation.
- Access the form on desktop and mobile devices.

Public forms must reflect the latest published version, not unpublished draft changes.

Form submission processing and response storage are outside the current project scope.

## 3. Do's

- Follow `rules.md` for all technical implementation decisions.
- Keep the user experience simple and intuitive.
- Build one phase at a time.
- Maintain consistent interactions across all form fields.
- Provide immediate visual feedback for user actions.
- Preserve user changes when switching between editing and preview.
- Clearly distinguish draft and published states.
- Require confirmation before destructive actions.
- Provide meaningful loading, success, and error feedback.
- Verify each phase before proceeding.

## 4. Don'ts

- Do not implement features outside the defined project scope.
- Do not implement authentication, analytics, integrations, or response management.
- Do not introduce unnecessary complexity into the builder.
- Do not automatically publish forms when saving.
- Do not modify live forms when users edit drafts.
- Do not allow publishing invalid forms.
- Do not allow unpublished forms to remain publicly accessible.
- Do not discard unsaved changes without warning.
- Do not duplicate responsibilities already defined in `rules.md`.
- Do not start multiple development phases simultaneously.

## 5. Codex Working Instructions

1. Read the project description and `rules.md` before starting any work.
2. Understand the complete user interaction flow.
3. Follow the defined development phases in order.
4. Focus only on the current phase.
5. Avoid implementing future-phase functionality prematurely.
6. Reuse existing completed functionality wherever possible.
7. Keep the builder, preview, and published form experiences consistent.
8. Verify the expected user interactions after each phase.
9. Report completed functionality, outstanding issues, and the next recommended phase.
10. Do not make unrelated project changes.
11. Ask for clarification when product behavior or requirements are ambiguous.
12. Treat `rules.md` as the source of truth for coding standards and architecture.

## 6. Final Project Goal

Deliver a complete visual form-building and publishing experience where users can:

**Create → Customize → Preview → Save → Publish → Share**

The application must be intuitive, responsive, reliable, and easy to extend in future development.

**Success Criteria:** A user can create a form from scratch, configure its fields, save it, reopen it, publish it, and access the correct published version through a shareable URL without encountering data loss or inconsistent behavior.
