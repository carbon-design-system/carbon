/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Jest mock for `@carbon/web-components/es/globals/register.js`.
 *
 * `defineCustomElement` is a no-op in the jsdom test environment — WC
 * registration and rendering are tested in Layer 2 (Playwright). At the
 * Angular unit-test layer we only care that inputs are reflected as
 * attributes on the host element, which Angular's template binding handles
 * without the real WC being defined.
 */
export const defineCustomElement = () => {};
export default defineCustomElement;
