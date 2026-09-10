# Form participation

> **Deprecated.** The `formdata` event mechanism described here is deprecated in
> v2 and removed in v3, replaced by native form association through
> [`ElementInternals`][element-internals]. It keeps working unchanged until v3.
> To try the replacement today, see [Form participation moves to
> `ElementInternals`][migration] in the v3 migration guide.

## What we do today

Carbon's form components participate in a containing `<form>` by listening for
its [`formdata` event][formdata-event] and appending their value to
`event.formData`. `FormMixin` (`src/globals/mixins/form.ts`) attaches that
listener on connect, and each component implements `_handleFormdata`.

This was chosen as a stop-gap. The original assessment recorded here concluded
that the full form-associated custom element API was not yet available across
the browsers Carbon supported — Safari in particular had [no
roadmap][webkit-bug] at the time — and that the `formdata` event was the
practical alternative until it was.

## Why it is being replaced

This limitaion is no longer true. Form-associated custom elements are supported
in every browser Carbon supports:

| Browser | Form-associated custom elements |
| ------- | ------------------------------- |
| Chrome  | 77+                             |
| Firefox | 98+                             |
| Safari  | 16.4+                           |

More importantly, the `formdata` approach is not a complete substitute. It can
only emulate one of the things a form control does — contributing a value at
submit time. Everything else a control gets from the platform is missing, and
cannot be added from an event listener:

| Form control behavior                         | `formdata` mixin |
| --------------------------------------------- | ---------------- |
| Contributes a value on submit                 | Yes              |
| `<label for>` associates with the control     | No               |
| Appears in `form.elements`                    | No               |
| Restored by `form.reset()`                    | No               |
| Excluded by an ancestor `<fieldset disabled>` | No               |
| Participates in constraint validation         | No               |

Two of those are defects, not gaps. `<label for>` silently not associating is an
accessibility failure, and a value inside a disabled `<fieldset>` still being
submitted is a semantic one.

## The replacement

`FormAssociatedMixin` (`src/globals/mixins/form-associated.ts`) sets
`static formAssociated = true`, attaches `ElementInternals`, and pushes the
value with `setFormValue()`. Everything in the table above then comes from the
platform.

Because `formAssociated` is read once by the browser at
`customElements.define()` and cannot be toggled per instance or after
registration, this cannot ship behind Carbon's runtime `<feature-flags>`
element. It ships instead under separate `cds-preview-*` tags, the same approach
used by `cds-preview-date-picker`, and becomes the behavior of the canonical
tags in v3.

### Implementation notes

Two details are easy to get wrong and are worth knowing if you add a component
to the preview set:

- **`name` must reflect.** `setFormValue()` reads the `name` _content
  attribute_, not the property. Carbon declares `name` without `reflect`, so a
  name set only as a property — which is what framework template bindings do —
  submits no entry at all.
- **`disabled` means the element's own attribute.** Matching
  `HTMLInputElement.disabled`, an element inside a disabled `<fieldset>` reports
  `false` and matches `:disabled` instead. The platform does not disable shadow
  content on its own, so `FormAssociatedMixin` disables the rendered control to
  match what a UA does for a built-in — and restores exactly the controls it
  changed, because the template's `disabled` binding never changed and Lit will
  not undo it.
- **Sync the value synchronously.** `FormAssociatedMixin` pushes the value from
  `requestUpdate()`, which Lit calls synchronously from its setters. Doing it in
  an async lifecycle such as `updated()` leaves a stale value readable by a
  `new FormData(form)` in the same task, which a native control never does.

## Migration

See [Form participation moves to `ElementInternals`][migration] in the v3
migration guide for the tag names, how to test early, and what changes when the
preview becomes the default.

[element-internals]:
  https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals
[formdata-event]:
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event
[webkit-bug]: https://bugs.webkit.org/show_bug.cgi?id=193231
[migration]:
  https://github.com/carbon-design-system/carbon/blob/main/docs/guides/cwc-v3-migration.md#form-participation-moves-to-elementinternals
