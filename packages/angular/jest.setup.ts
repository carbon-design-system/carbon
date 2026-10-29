/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { TestBed } from '@angular/core/testing';

setupZoneTestEnv();

// Ensure TestBed is reset after every test so component-level
// CUSTOM_ELEMENTS_SCHEMA registrations do not leak between suites.
afterEach(() => {
  TestBed.resetTestingModule();
});

/**
 * jsdom ships `attachInternals()` but not the form-associated parts of
 * `ElementInternals` (`setFormValue`, `setValidity`, ...). The real
 * `@carbon/web-components` form mixins call them, so shim the missing methods
 * as no-ops. Everything else about the element is the real implementation.
 */
const nativeAttachInternals = HTMLElement.prototype.attachInternals;
HTMLElement.prototype.attachInternals = function patchedAttachInternals() {
  const internals = nativeAttachInternals.call(this) as ElementInternals;
  const noop = () => undefined;
  const shim: Record<string, unknown> = {
    setFormValue: noop,
    setValidity: noop,
    checkValidity: () => true,
    reportValidity: () => true,
    willValidate: true,
    validationMessage: '',
    validity: { valid: true },
    labels: [],
    form: null,
  };
  const existing = internals as unknown as Record<string, unknown>;
  for (const [key, value] of Object.entries(shim)) {
    if (!(key in internals) || typeof existing[key] === 'undefined') {
      Object.defineProperty(internals, key, { value, configurable: true });
    }
  }
  return internals;
};

/**
 * jsdom does not implement `ResizeObserver`. Several web components
 * (`CDSAccordionItem`, `CDSDropdownItem`, etc.) call `new ResizeObserver(...)`
 * in their constructors. Shim it as a no-op so they can be instantiated.
 */
if (typeof ResizeObserver === 'undefined') {
  (global as unknown as { ResizeObserver: unknown }).ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

/**
 * jsdom does not implement `Element.prototype.scrollIntoView`. `cds-ai-label`
 * (`CDSAILabel`, from the toggletip) calls it in `updated()`, and the resulting
 * TypeError is an uncaught exception that ends the Jest worker. Shim it as a
 * no-op; scrolling is layout behavior jsdom cannot verify anyway.
 */
if (typeof Element.prototype.scrollIntoView !== 'function') {
  Element.prototype.scrollIntoView = () => undefined;
}

/**
 * jsdom does not implement `delegatesFocus`. In real browsers, calling
 * `focus()` on an element with `shadowRoot.delegatesFocus` sets it as
 * `document.activeElement`. In jsdom, `attachShadow` drops `delegatesFocus`
 * and `super.focus()` on a custom element without `tabIndex` is a no-op.
 */
const nativeAttachShadow = Element.prototype.attachShadow;
Element.prototype.attachShadow = function patchedAttachShadow(
  init: ShadowRootInit
) {
  const shadowRoot = nativeAttachShadow.call(this, init);
  if (init && 'delegatesFocus' in init) {
    Object.defineProperty(shadowRoot, 'delegatesFocus', {
      value: init.delegatesFocus,
      configurable: true,
      writable: true,
    });
  }
  return shadowRoot;
};

const nativeFocus = HTMLElement.prototype.focus;
HTMLElement.prototype.focus = function patchedFocus(options?: FocusOptions) {
  if (this.shadowRoot?.delegatesFocus && !this.hasAttribute('tabindex')) {
    this.setAttribute('tabindex', '0');
  }
  nativeFocus.call(this, options);
};
