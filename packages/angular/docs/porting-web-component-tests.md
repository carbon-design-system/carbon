# Porting web component tests to `@carbon/angular`

Every Angular wrapper in `src/generated/` renders a real
`@carbon/web-components` element. That means the web component (WC) test suite
is the best specification we have for how a component should behave, and we can
reuse it instead of inventing new assertions.

For each component you build out, you ship **three** things together:

| Deliverable                  | File                                                 | Purpose                                                                           |
| ---------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------- |
| Stories                      | `src/stories/<Name>/__stories__/<Name>.stories.ts`   | See [ADR 0019](../../../docs/decisions/0019-angular-storybook-story-authoring.md) |
| **Parity spec** (this guide) | `src/stories/<Name>/__tests__/<Name>.parity.spec.ts` | Port of the WC unit tests, run in Jest                                            |
| Binding spec                 | `src/stories/<Name>/__tests__/<Name>.spec.ts`        | Every `@Input()` / `@Output()` reaches the WC                                     |
| E2E (as needed)              | `src/stories/<Name>/__tests__/<Name>.e2e.ts`         | Layout, focus, keyboard — things jsdom cannot do                                  |

The Button is the reference implementation. Open
[`Button.parity.spec.ts`](../src/stories/Button/__tests__/Button.parity.spec.ts)
next to
[`button-test.js`](../../web-components/src/components/button/__tests__/button-test.js)
while reading this.

## What a parity test proves

> Given the same input, the Angular wrapper produces the same rendered result as
> the web component.

It does **not** re-test the web component. If a WC test fails when ported, the
bug is in the wrapper (or its generator), not in the WC.

## How the test environment works

- Jest + jsdom, using the **real** `@carbon/web-components` build — no stubs.
  Build it first: `yarn workspace @carbon/web-components build` (CI does this).
- `jest.setup.ts` shims the parts of `ElementInternals` jsdom lacks
  (`setFormValue`, `setValidity`, …) so form-associated components can render.
- `src/testing/render.ts` provides `render()`, the Angular equivalent of
  open-wc's `fixture(html\`...\`)`.

## Step by step

### 1. Find the WC tests

```bash
ls packages/web-components/src/components/<name>/__tests__/
```

Each `<name>-test.js` is a candidate. Skip `__snapshots__/`.

### 2. Create the spec

Copy the file header from `Button.parity.spec.ts`. Name it
`<Name>.parity.spec.ts` and keep the WC test's `describe` / `it` titles
verbatim. Matching titles make it easy to diff the two suites later.

### 3. Translate each test

| Web component test                                | Angular parity test                                                                 |
| ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `await fixture(html\`<cds-x foo="a">…</cds-x>\`)` | `await render('<cds-x foo="a">…</cds-x>', [XComponent])`                            |
| `el.shadowRoot.querySelector('button')`           | `wc(el).shadowRoot.querySelector('button')` (see helpers below)                     |
| `el.disabled = true; await el.updateComplete`     | `host.disabled = true; await update()` with `[disabled]="disabled"` in the template |
| `expect(el).to.have.attribute('kind', 'ghost')`   | `expect(wc.getAttribute('kind')).toBe('ghost')`                                     |
| `expect(x).to.have.class('foo')`                  | `expect(x.classList.contains('foo')).toBe(true)`                                    |
| `expect(x).to.exist` / `to.not.exist`             | `toBeTruthy()` / `toBeNull()`                                                       |
| `await expect(el).shadowDom.to.equalSnapshot()`   | Drop it — see "Snapshots" below                                                     |

Define two tiny helpers at the top of each spec:

```ts
// In the host-is-WC design (ADR 0015) the Angular wrapper's host IS the
// web component — there is no inner cds-ng-* element.
// TestBed places the component inside a fixture element, so we query down.
const wc = (el: HTMLElement) =>
  el.querySelector('cds-button') as HTMLElement & { shadowRoot: ShadowRoot };
const inner = (el: HTMLElement, selector: string) =>
  wc(el).shadowRoot.querySelector(selector) as HTMLElement | null;
```

`cds-<name>` is both the Angular selector and the web component tag. The host
element IS the WC. **Always assert on the element's shadow DOM** by going
through the `wc()` helper, not on Angular wrapper internals.

### 4. Use Angular binding names, not attribute names

The WC test writes `tooltip-alignment="start"`. The wrapper's input is the
property name, so write `tooltipAlignment="start"` (static) or
`[tooltipAlignment]="x"` (dynamic). Boolean inputs accept the bare form:
`<cds-button disabled>`.

When a WC test uses an attribute that is **not a real property** on the WC (for
example Button's `has-icon-only`, which the WC derives from slot content), port
the _behavior_ the test is really checking, and leave a comment saying what you
changed and why. Button's "should set the icon-only class" is an example.

### 5. Triage what can't be ported

Don't silently drop tests. Use `it.todo('<original title>')` so the gap is
visible in the Jest summary, and add a one-line reason above it:

| Reason                                                        | Action                                                                                 |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Needs layout (`getBoundingClientRect`, RTL positions, scroll) | `it.todo`, and add a Playwright case in `<Name>.e2e.ts` if the wrapper could affect it |
| Needs real focus / keyboard / pointer behavior                | Playwright                                                                             |
| Depends on a feature the wrapper doesn't expose yet           | `it.todo` + open a follow-up                                                           |
| Pure WC internals unrelated to the wrapper                    | `it.todo`, note "WC-internal"                                                          |

### 6. Snapshots

WC tests use `equalSnapshot()` on the shadow DOM. Don't port those: the snapshot
files belong to the WC package, and a copy would drift. Replace each one with
the specific assertion the test name implies (for example, "should render an
element with the button role" becomes "a `<button>` exists").

### 7. Run it

```bash
yarn workspace @carbon/angular test <Name>
```

All ported tests must pass and every skipped test must be an `it.todo`.

## When a ported test fails

Work out which layer is wrong before changing anything:

1. **Wrapper binding.** Check `src/generated/<Name>/<Name>.component.ts`. Is the
   input missing, bound under the wrong attribute, or typed incorrectly?
2. **Generator.** If it's wrong in the generated file, fix
   `tasks/generate-wrappers/index.js` and re-run `yarn generate:wrappers`.
   **Never hand-edit `src/generated/`.** Add a case to
   `src/__tests__/generated-wrappers.spec.ts` for the rule you changed.
3. **Test.** If the WC test uses something the wrapper intentionally doesn't
   expose, adjust the port and say why.

Two generator rules that have already caught real bugs:

- Inputs with a declared attribute and a string-safe type are bound as
  attributes. Everything else is assigned as a **property** in `ngOnChanges`.
  Binding camel-case names with `[attr.isFoo]` doesn't work, because HTML
  lowercases the attribute name.
- Boolean inputs use `booleanAttribute`, so `<cds-x disabled>` (which Angular
  passes as `""`) is treated as `true`.

## Checklist for a new component

- [ ] `yarn generate:wrappers` run, and the component exists in `src/generated/`
- [ ] Stories completed (ADR 0019), `// TODO(parity)` entries resolved or
      ticketed
- [ ] `<Name>.parity.spec.ts` ported from the WC `*-test.js` files, titles
      preserved
- [ ] Every non-ported test is an `it.todo` with a reason
- [ ] `<Name>.spec.ts` covers each `@Input()` / `@Output()` binding
- [ ] `<Name>.e2e.ts` covers anything listed under "Playwright" above
- [ ] `yarn workspace @carbon/angular test` and `build` pass

## Porting backlog

State as of 2026-10-28. Only Button has the full set. Everything else has
generated wrappers and, for the six below, hand-written Playwright checks that
were not derived from the WC tests.

| Component  | Parity spec | Binding spec       | E2E (hand-written, step 8) | WC tests to port                                                                                                      |
| ---------- | ----------- | ------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Button     | Done        | Done               | Done                       | None left (10 `it.todo`)                                                                                              |
| Modal      | No          | `ModalFooter` only | Done                       | `modal/__tests__/modal-test.js`                                                                                       |
| Accordion  | No          | One input only     | Done                       | `accordion/__tests__/accordion-test.js`                                                                               |
| ActionSet  | No          | No                 | Done                       | `action-set/__tests__/action-set-test.js`                                                                             |
| Checkbox   | No          | Value accessor     | Done                       | `checkbox/__tests__/checkbox-test.js`, `checkbox-form-test.js`, `checkbox-group-test.js`, `checkbox-skeleton-test.js` |
| TextInput  | No          | Value accessor     | Done                       | `text-input/__tests__/`                                                                                               |
| Dropdown   | No          | No                 | Done                       | `dropdown/__tests__/`                                                                                                 |
| All others | No          | No                 | No                         | `<name>/__tests__/` for each of the ~270 remaining wrappers                                                           |

Order suggestion: the six step 8 components first (their stories and e2e specs
already exist), then the other 27 wrappers with a value accessor, then the
composites that register children. Before porting file by file, cost a shared
harness that runs a WC suite against its wrapper; at ~270 components, copying
each file by hand is the expensive path.
