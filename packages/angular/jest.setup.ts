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
