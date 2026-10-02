# 11. Implement `ControlValueAccessor` on the Angular wrapper, not on the Web Component

Date: 2026-09

## Status

Accepted

## Context

`@carbon/web-components` elements participate in HTML forms via the native
`ElementInternals` / `formAssociated` API. This makes them work with plain HTML
`<form>` elements and browser form APIs without any framework glue.

Angular's forms system (`ReactiveFormsModule`, `FormsModule`) uses a different
protocol: `ControlValueAccessor` (CVA). A CVA is an Angular interface that
bridges an Angular `FormControl` to a DOM element. Angular ships built-in CVAs
for `<input>`, `<select>`, etc. For custom elements, a CVA must be provided
explicitly.

Two approaches were considered for forms integration in `@carbon/angular`:

1. **CVA on the WC element** — implement CVA inside `@carbon/web-components` so
   the WC element itself registers as a CVA provider. The Angular wrapper would
   inherit it automatically.
2. **CVA on the Angular wrapper** — implement CVA in the Angular component
   class. The WC element's native `formAssociated` behaviour is used for plain
   HTML forms; Angular's `FormControl` / `ngModel` protocol is handled entirely
   by the Angular wrapper.

## Decision

`ControlValueAccessor` is implemented on the Angular wrapper component class,
not on the WC element. The WC's native `formAssociated` / `ElementInternals` API
is used as-is for plain HTML form participation. The Angular wrapper adds CVA on
top for `[formControl]` and `[(ngModel)]` compatibility.

Concretely: each form-input wrapper class implements `ControlValueAccessor`,
provides itself via `NG_VALUE_ACCESSOR`, and wires `writeValue` /
`registerOnChange` / `registerOnTouched` to the underlying `cds-ng-*` element's
value attribute and WC change events.

Option 1 was rejected for two reasons:

- **Separation of concerns**: `@carbon/web-components` is a framework-agnostic
  library. Introducing an Angular interface (`ControlValueAccessor`) into the WC
  package creates a hard Angular dependency in a package that is also used by
  React, Vue, and vanilla JS consumers.
- **CVA types differ per component**: for a checkbox, the CVA value type is
  `boolean`; for a text input, `string`; for a multi-select, `string[]`; for a
  slider range, `[number, number]`. These types are Angular API decisions, not
  WC API decisions. Placing them in the WC layer would require the WC to know
  about Angular-specific value conventions.

## Consequences

- Every form-input Angular wrapper class implements `ControlValueAccessor`. The
  implementation is 20–40 lines per component: `writeValue` sets the WC
  attribute, `registerOnChange` subscribes to the WC's change event,
  `registerOnTouched` subscribes to the WC's blur event.
- `ChangeDetectorRef.markForCheck()` is called after every WC event emission to
  ensure `OnPush` change detection propagates correctly. This is safe by design
  — no manual zone management is required.
- The WC's native `formAssociated` behaviour is preserved and works
  independently of the Angular CVA layer. A consumer using `@carbon/angular`
  components inside a plain HTML `<form>` (outside Angular's forms system) gets
  correct native form participation from the WC without any additional Angular
  configuration.
- Layer 1 (Jest) CVA tests follow one pattern per form component:
  `writeValue(x)` → assert WC attribute set; simulate WC change event → assert
  `onChange` callback fired. The CVA interface contract is fully testable in
  jsdom without the real WC lifecycle.
