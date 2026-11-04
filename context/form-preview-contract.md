# Demo form preview

- Phase: isolated preview demo; no builder or publishing implementation.
- Feature: `form-preview`; entry: `FormPreviewFeature`; hook: `useFormPreview`.
- Route: `/form-preview`.
- Settings: form title, name field label, and message heading.
- State owner: feature hook using local React state, scoped to each mounted demo. Preview input values remain component-local browser state.
- Flow: settings callback -> hook state update -> settings and preview props.
- Persistence: memory only; leaving the page or reloading resets settings. No API, service, or global store is needed for these simple local edits.
- Validation/errors: free-form text, including empty strings, is allowed for experimentation. Preview fields retain accessible fallback labels when headings are empty. No submission or transport errors apply.
- Acceptance: all three settings update the preview immediately; preview inputs remain usable while settings change; columns stack on small screens.
