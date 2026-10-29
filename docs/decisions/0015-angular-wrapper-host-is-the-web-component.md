# 15. Make the `@carbon/angular` wrapper's host element the web component itself

Date: 2026-10

## Status

Partially superseded by [ADR 0020](0020-angular-wholesale-cds-ng-prefix.md)
(accepted 2026-10-27). ADR 0020 keeps the "wrapper host is the web component"
part of this decision and replaces the "registered under the real `cds-*` tag"
part with a wholesale `cds-ng-*` prefix over a prefixed build of the web
components. The findings below remain the measured basis for both. The
"registered under the real `cds-*` tag" text below is superseded.

`@carbon/angular/legacy` was removed from the repository on 2026-10-26. The
"Legacy and generated wrappers on one page" open question and remaining-work
item 7 below are therefore resolved by removal, and the legacy code they
describe no longer exists. A spike with the CCA Modal showed that CCA and the
real `cds-*` tag do not coexist; see ADR 0020 open question 1.

## Context

`@carbon/angular` wraps `@carbon/web-components` elements as Angular components.
Each wrapper (for example `ButtonComponent`, selector `cds-button`) needs a
backing web component, and ADR 0014 requires the consumer-facing selector to
stay `cds-*`.

Two problems follow from that requirement:

1. If the wrapper's template renders a web component registered as `cds-button`,
   Angular matches its own selector inside the template and instantiates the
   wrapper recursively.
2. If `@carbon/angular` registers the real `cds-*` tags, they can collide with
   registrations made by `@carbon/web-components` on the same page. The global
   custom element registry allows one definition per tag name.

ADR 0007 made renaming possible by providing pure class exports and
`defineCustomElement(clazz, { name })`. The first design used that to register
each class under a private `cds-ng-*` tag and render it inside the wrapper:

```ts
defineCustomElement(CDSButton, { name: 'cds-ng-button' });

@Component({
  selector: 'cds-button',
  template: `<cds-ng-button ...><ng-content /></cds-ng-button>`,
})
export class ButtonComponent {}
```

(`cds-ng-*` was chosen over `cds-wc-*` because it says which package registered
the tag, and neither prefix was used by `@carbon/web-components` or
`carbon-components-angular`.)

While checking whether the output of `generate-wrappers` actually works, we
found that renaming the tag has costs that were not visible when that design was
chosen. The scope of the investigation was the Button, with the Accordion and
`ModalFooter` used as probes. Everything below was measured in Chromium
(Playwright) using the built `@carbon/styles` stylesheet and the real
`@carbon/web-components` build, unless stated otherwise. The scratch pages used
for the measurements were not committed.

### What we found

**1. The built package is wired correctly; it is just easy to misread.**
`packages/angular/dist/generated/*/` contains only `.d.ts` files. All runtime
code for every component is in one bundle, `dist/fesm2022/carbon-angular.mjs`,
which imports `@carbon/web-components/es/...` and calls `defineCustomElement`
once per component (279 each). The bundle contains the Angular wrapper layer
only. Lit, styles and behavior stay in the `@carbon/web-components` peer
dependency. Loading the built bundle in a browser rendered the Accordion and
opened it on click with no console errors.

**2. A renamed tag loses styles and logic that are keyed on the original tag.**
Component styles select on their own tag name. In the built output, 113 of 126
component style files use `:host(cds-<tag>...)` selectors, and 36 use
`::slotted(cds-<tag>...)`. Parent components also find children by tag name in
code. When a class is registered under another name, those rules and lookups no
longer match.

- **Accordion item.** Registered as `cds-accordion-item`, the header measured
  48px high. Registered as `cds-ng-accordion-item`, with no Angular involved, it
  measured 20px and looked unstyled. The Accordion's own code also queries its
  children with the literal selector `cds-accordion-item`.
- **Button.** We compared the Button under both tags across 15 variants (7
  kinds, 6 sizes, disabled, expressive, link). Every measured style on the inner
  `<button>` was identical. The difference was on the host element: `display` is
  `inline-flex` under `cds-button` and `inline` under `cds-ng-button`. Placed
  inline in a paragraph, the host box was 48px high under `cds-button` and 18px
  under `cds-ng-button`, with a different gap between buttons. The rule that
  sets this is
  `:host(cds-button), :host(cds-dialog-footer-button), :host(cds-modal-footer-button)`,
  which also sets the `--cds-layout-size-*` variables.

We initially assumed the rename broke Button styling broadly. The measurement
showed it does not; the effect on the Button is limited to the host element.
Other components, such as the Accordion, are affected more.

**3. Parent web components inspect their slotted children by tag name.** These
lookups exist in the source:

| Parent                   | Lookup                                                            |
| ------------------------ | ----------------------------------------------------------------- |
| `cds-action-set`         | `elem.matches('cds-button')` and `querySelectorAll('cds-button')` |
| `cds-modal-footer`       | `selectorButtons` = `cds-button, cds-modal-footer-button`         |
| tearsheet helpers        | `querySelectorAll('[slot="header-actions"] cds-button')`          |
| `cds-radio-button-group` | `querySelectorAll(selectorRadioButton)`                           |

We tested `cds-modal-footer` with three buttons in three arrangements:

| Buttons placed in the footer                 | Slotted children    | `hasThreeButtons` |
| -------------------------------------------- | ------------------- | ----------------- |
| Bare web components                          | `cds-button` x 3    | `true`            |
| Wrapper host is the web component            | `cds-button` x 3    | `true`            |
| Wrapper element around an inner `cds-button` | `cds-ng-button` x 3 | `false`           |

In the third arrangement the footer's `matches()` check found no buttons, so the
three-button layout never turned on. This applies to any design where the node
slotted into the parent is a wrapper element rather than the web component.
Renaming the wrapper (for example `carbon-button` or `cds-ng-button`) does not
help; the slotted node is still not a `cds-button`.

**4. A wrapper whose host is the web component behaves like the bare web
component.** We built a throwaway prototype: the Angular selector is
`cds-button`, the template is only `<ng-content />`, the real class is
registered under its default tag with `defineCustomElement(CDSButton)`, and
`@Input()` values are forwarded to the host element in `ngOnChanges`.

- Layout matched a bare `<cds-button>`: host `display: inline-flex`, 48px high,
  same gap, and no extra element.
- Static attributes (`kind="ghost" size="sm"`) and bound inputs (`[kind]`,
  `[disabled]`) reached the element. Changing a bound input later updated the
  rendered classes (`cds--btn--danger`, `cds--btn--disabled`).
- Inputs the consumer did not set kept the web component's defaults (`kind`
  stayed `primary`, `size` stayed `lg`), because only changed inputs are
  forwarded.
- A bare boolean attribute (`<cds-button disabled>`) only works when the input
  uses `booleanAttribute`, since Angular passes `""`.

**5. Events can be delivered more than once, or in a loop.** The web components
dispatch real DOM events (`change`, `input`, `invalid`, and custom ones such as
`cds-checkbox-changed`). Angular's `(name)="..."` syntax listens to either a
component `@Output` or a DOM event with that name.

- The generator emitted an `@Output` for every manifest event, including
  native-named ones. Measured with the `<cds-text-input>` wrapper under Jest and
  the real web component, a consumer's `(change)` handler ran **2 times** for
  one native `change` event. This was already a bug under the `cds-ng-*` design.
- In the prototype, an `@Output() change` re-emitted from
  `@HostListener('change')` on the host element ran the handler **580 times**
  and ended in `RangeError: Maximum call stack size exceeded`. We did not trace
  the exact cause of the loop; we only know this combination triggers it.
- No `@Output` for the native event: handler ran **1** time.
- An `@Output` declared but never emitted: **1** time.
- An `@Output` with a different name (`valueChange`) re-emitted from the native
  event: **1** time, with the correct value.
- Native-named events are common: `invalid` appears in 16 components, `change`
  in 11 and `input` in 8.

**6. Generator problems fixed along the way.** These are independent of the
decision below but were found by the same investigation and are already
addressed in `tasks/generate-wrappers/index.js`: form-associated components had
no `ControlValueAccessor` (ADR 0013 said they should); Lit and form-internal
properties (`renderRoot`, `isUpdatePending`, `willValidate`, `validity`, `form`,
`labels`, and similar) were emitted as inputs and bound as attributes;
non-string properties were bound with `[attr.x]` and became `"[object Object]"`;
and boolean inputs ignored the bare-attribute form.

## Options considered

**A. Wrapper selector `cds-button`, inner element `cds-ng-button`.** The first
design, described in Context. It has the host-element layout difference for the
Button (finding 2), unstyled or partly broken components where styles and logic
key on the tag (finding 2), and broken slotted-child lookups in compound
components (finding 3).

**B. Keep `cds-ng-*` and add CSS to the wrapper to replace the missing host
rules.** The smallest change, but it copies rules the web component owns into
the Angular package, and they drift when the web component changes. We only
measured one difference for the Button across 15 variants; hover, focus,
icon-only, tooltip and button-set contexts were not compared. It also cannot fix
logic that looks up children by tag name. It does not scale to a generator.

**C. Different Angular selector (for example `carbon-button`, or
`cds-ng-button`) wrapping the real `cds-button` in its template.** The web
component runs under its real tag, so styles and its own logic work. It fails
the slotted-child lookups in finding 3, because the node slotted into a parent
is the wrapper. It also makes consumers rename every element, which ADR 0014
rejects.

**D. The wrapper's host element is the web component.** Selected; described
below.

## Decision

Generated wrappers in `@carbon/angular` will use the web component's own tag as
their Angular selector, and the wrapper's host element will be the web
component. No `cds-ng-*` tags are registered.

1. **Selector and registration.** The `@Component` selector is the web
   component's tag (for example `cds-button`). The wrapper module registers the
   class under its default tag with `defineCustomElement(CDSButton)`, using the
   pure class import from ADR 0007.
2. **Template.** The template is `<ng-content />` only. There is no inner
   element, which also avoids the recursive-selector problem: the wrapper's host
   is the web component, so Angular has nothing inside the template to match.
3. **Inputs.** Each `@Input()` is forwarded to the host element as a property in
   `ngOnChanges`, only for inputs that actually changed. Boolean inputs use
   `booleanAttribute`. Properties the web component marks as internal, and
   read-only form state, are not emitted as inputs.
4. **Events.** An `@Output` must never have the same name as a DOM event that
   the host element dispatches. For events with native names (`change`, `input`,
   `invalid`), the generator emits no `@Output`, and consumers use Angular's
   normal `(change)="..."` DOM-event binding. For custom events, an `@Output`
   may be emitted only with a name that differs from the DOM event name.
5. **Forms.** `ControlValueAccessor` stays on the Angular wrapper, as decided in
   ADR 0013, and reads and writes the host element directly.
6. **Compound components.** Because slotted nodes are real web component
   elements, parent lookups such as `matches('cds-button')` work without special
   handling.

## Consequences

Positive:

- Layout and styling are the web component's own, since it runs under its
  intended tag. For the Button this removes the host `display` and box-size
  difference.
- Compound components work by construction (finding 3).
- One element per component instead of two, so a smaller DOM.
- Consumers write `<cds-button>`, so the intent of ADR 0014 is preserved for
  anyone moving from `carbon-components-angular`, subject to the open question
  below.
- Removes the double-call that existed for native-named events.

Negative or risky:

- Importing `@carbon/angular` registers the real `cds-*` tags in the global
  custom element registry. A page with two copies of `@carbon/web-components`
  (or `@carbon/angular` plus a separately loaded `@carbon/web-components`) gets
  first-definition-wins and a development warning (ADR 0007). The `cds-ng-*`
  prefix existed to avoid this.
- Typed event data is lost for native-named events. `$event` is a plain `Event`
  and editors will not autocomplete its fields, as with any DOM event on a
  native element. We did not check how this appears in an editor with
  `strictTemplates`.
- Angular does not set an `@Input` on the DOM element; the wrapper has to
  forward each one. The generator and the `ControlValueAccessor` are reworked.
- Tests change. Specs query the host element's shadow root directly, with no
  inner `cds-ng-*` element.
- Some documents still describe the old shape. See "Remaining work".

## Open questions

- **Legacy and generated wrappers on one page.** The legacy Button
  (`@carbon/angular/legacy`) has Angular selector `cds-button` and registers
  `CDSButton` under `cds-ng-button`. The generated wrapper also has selector
  `cds-button` and registers `CDSButton` under the real tag. **Checked (reading
  the code only, never run together):** the two selectors collide, so a template
  cannot safely import both for the same component. The legacy layer would need
  a distinct selector, which would conflict with ADR 0014's goal of selector
  preservation. Unresolved: **do not ship both layers together until it is
  resolved.** Whether a legacy layer should exist, or with what narrower scope,
  is being reconsidered in a separate task. This ADR does not decide it, and the
  legacy code still uses the `cds-ng-*` shape.
- **What selector does `carbon-components-angular` actually use for Button?**
  **Checked (source read):** an attribute directive,
  `@Directive({ selector: "[cdsButton], [ibmButton]" })`. There is no
  `cds-button` element selector in CCA, so there is nothing for the
  `@carbon/angular` `cds-button` element to conflict with. Modal and Dropdown
  are element selectors (`cds-modal`, `cds-dropdown`). ADR 0014 has been
  corrected. The consequence is that Button users change their templates when
  migrating.
- **`CUSTOM_ELEMENTS_SCHEMA` no longer needed.** With the template reduced to
  `<ng-content />`, there are no custom elements in the Angular template at all.
  The generated wrappers no longer include `schemas: [CUSTOM_ELEMENTS_SCHEMA]`.
  **Checked (generator output):** confirmed removed.
- **Type-checking.** The prototype ran with the JIT compiler. The behavior under
  the production `ng-packagr` build with `strictTemplates` is not verified.
  **Checked (build):** `yarn workspace @carbon/angular build` passes cleanly
  with `ng-packagr` in partial-Ivy mode. `strictTemplates` behavior in a
  consumer app is not yet verified.
- **Tree-shaking.** The wrapper registers elements at module load. The bundle
  already contains 279 top-level `defineCustomElement` calls with
  `"sideEffects": false`. How a consumer's bundler treats these has not been
  tested, and ADR 0007's goal of tree-shakeable registration is not met by
  registering at import time.
- **Scope.** Only the Button and `ModalFooter` were exercised, and only in jsdom
  (forms integration, event count, `ModalFooter` compound behavior). The
  Playwright checks are written but have not been run. Other components (form
  controls, components with slots or named children, `ActionSet`) are untested
  under this design in a real browser.

## Implementation status

> **Update 2026-10-28.** This section and "Remaining work" describe the state
> when the decision was written (Button only). Since then the generator covers
> all wrappers, and Accordion, Checkbox, Dropdown, TextInput, Modal and
> ActionSet have stories, parity specs and Playwright checks as well (36 passed
> in Chromium, last run before the step 9 story additions; Jest: 11 suites, 250
> passed, 45 `it.todo`). Remaining-work items 1, 4 and 7 are done or resolved
> and are struck through below. For current state see
> [`status-and-open-questions.md`](../../packages/angular/docs/status-and-open-questions.md).

Done for the Button (Jest: 5 suites, 105 tests passing, 10 `it.todo`;
`yarn build` passes):

- Generator ported to this design in `tasks/generate-wrappers/index.js`.
- `ModalFooter` three-button test asserting `hasThreeButtons` (jsdom).
- Event-count test: one handler call per native `change` event (jsdom).
- Playwright computed-layout check written in `Button.e2e.ts`. **Never run**
  when this was written; it has since run (9 passed in Chromium).
- Button parity and skeleton specs, stories, Storybook docs, READMEs and the
  porting guide updated to the host-is-the-web-component shape.

## Remaining work

Nothing below has been done unless it is listed above.

0. **Register child elements (added later, see ADR 0020 finding 2). Fixed:** the
   generator now imports the component barrel, and
   `src/__tests__/child-registration.spec.ts` guards it. The original problem:
   the generator imported each component's class file and registers only that
   class. Under pure exports this leaves the elements the component renders
   undefined (`cds-modal` without `cds-dialog`). About 58 pure classes that
   render other tags are certainly affected. Import the component barrel
   instead. This also means the "Scope" open question above understates the gap:
   more than the Button and `ModalFooter` are untested.

1. ~~**Run the Playwright checks.** `Button.e2e.ts` needs a built Storybook.
   Until it runs, the host `display: inline-flex` and 48px height claims are
   measured only by the earlier scratch prototype, not by the committed test.~~
   **Done:** 9 passed in Chromium.
2. **Verify in a consumer app.** The `ng-packagr` build passes, but a consumer
   app with `strictTemplates` has not been tried. That would also show how
   `$event` typing for native-named events looks in an editor.
3. **Tree-shaking.** Test how a consumer's bundler treats import-time
   registration with `"sideEffects": false`.
4. ~~**Other components in a real browser.** Only the Button and `ModalFooter`
   have been exercised. Form controls (the `ControlValueAccessor` path),
   components with named slots, and `ActionSet` still need checking, at least in
   jsdom and ideally in a browser.~~ **Done for TextInput, Checkbox, Dropdown,
   Accordion, Modal, `ModalFooter` and ActionSet.** The other wrappers are
   untested.
5. **Trace the event-loop case.** An `@Output() change` re-emitted from
   `@HostListener('change')` looped to a stack overflow. The generator now
   avoids it by emitting no such `@Output`, but the cause was never found. Check
   that the rule covers every native-named event, not only the ones in the
   generator's list. `NATIVE_DOM_EVENTS` was written by hand, so compare it
   against the events in `custom-elements.json`.
6. **Port the 10 `it.todo` Button tests** (8 RTL layout, 2 badge-indicator).
7. ~~**Legacy layer.** Decide whether it exists and what it covers (separate
   task).~~ **Resolved:** removed 2026-10-26. `docs/archive/` is a historical
   record and does not change.
8. **`docs/plan.md`** still has stale references to the old design and the
   removed legacy entry point. Rewrite is tracked as step 11 in
   `status-and-open-questions.md`.
9. **v12 migration doc.** **Decided 2026-10-28:** `@carbon/angular` is not
   behind a feature flag. It is new as of v12 and gets a separate migration doc
   for consumers coming from `carbon-components-angular`
   (`docs/guides/cca-to-angular.md`). Whether `docs/migration/v12.md` also needs
   a short entry is not decided; see `status-and-open-questions.md`.
10. **Audit CCA attribute directives.** Button is one. Find how many other CCA
    components are attribute directives rather than elements, since each is a
    template change for migrating users (see ADR 0014).
