# Event-based form participation

This document is for assessing if `carbon-web-components` library can support
event-based form participation spec, as a stop-gap solution until full-blown
[form-associated custom element API](https://github.com/whatwg/html/pull/4383)
in order for our components to support use cases seen e.g. with `<input>` in
`<form>`.

## Specifications and tests

### `formdata` event

- Explainer:
  https://docs.google.com/document/d/1JO8puctCSpW-ZYGU8lF-h4FWRIDQNDVexzHoOQ2iQmY/edit
- Spec: https://github.com/whatwg/html/pull/4239
- Tests:
  - https://github.com/web-platform-tests/wpt/pull/14637
  - https://github.com/web-platform-tests/wpt/pull/18910

## Browser support

### `formdata` event

- Chrome:
  [Starting Chrome 77](https://bugs.chromium.org/p/chromium/issues/detail?id=825684)
- Firefox:
  [Starting Firefox 71](https://bugzilla.mozilla.org/show_bug.cgi?id=1518442)
- Safari: [No roadmap yet](https://bugs.webkit.org/show_bug.cgi?id=193231)

### `FormData` object

Supported by all major browsers including IE11:
https://developer.mozilla.org/en-US/docs/Web/API/FormData

## Behaviours

- `formdata` event bubbles, not cancelable, not composed.
- `formdata` event is fired on `<form>`, upon submitting it. (e.g. upon
  `HTMLFormElement#submit()` call)

## The story with full-blown form-associated custom element API

From the
[explainer](https://docs.google.com/document/d/1JO8puctCSpW-ZYGU8lF-h4FWRIDQNDVexzHoOQ2iQmY/edit#heading=h.m351ojpczvcd):

> UA handles them as submittable elements. In constructing the entry list
> algorithm, UA creates an entry with name attribute value of the
> form-associated custom element, and the value set by `setFormValue()` of
> `ElementInternals` interface. Authors don’t need to register `formdata` event
> handlers.

## What we do for now

Our components code handles `formdata` event for the time being (until we are
ready, which means full-blown form-associated custom element API is supported by
all browsers we support), and switches to full-blown form-associated custom
element API once we are ready.

## Non-goal: High-fidelity shim/polyfill

Instead, it's likely that we merely define `formdata` event handler in our
custom elements (components). One scenario in mind is application manually fires
`formdata` event (upon user's gesture on form submit button, etc.) to let our
components populate `event.formData`, and run XHR/`fetch()` with the populated
`event.formData`.

## Non-goal: Feature-detection of full-blown form-associated custom element API

Given we require application to manually handle user's gesture for form
submission, and manually handle the data gathered from `formdata` event,
feature-detection of full-blown form-associated custom element API means that
application needs to maintain two codebase to use our components, one for
browsers with full-blown form-associated custom element API, one without. That
said, we are not likely to do feature-detection of full-blown form-associated
custom element API, at least for now.

## Non-goal: Supporting constraint validation API

For supporting
[constraint validation API](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#the-constraint-validation-api),
i.e. `checkValidity()`/`reportValidity()` and `invalid` event, etc., we'll wait
for full-blown
[form-associated custom element API](https://github.com/whatwg/html/pull/4383)
being available in all browsers we support.
