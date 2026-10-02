/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Jest mock for all `@carbon/web-components/es/components/**` imports.
 *
 * Returns a minimal stub class. At the Angular unit-test layer we only verify
 * that `@Input()` bindings are reflected as attributes on the rendered element;
 * the real WC class is not needed and its full build output is not guaranteed
 * to be present in the workspace during tests.
 */

 
class CDSStubElement extends HTMLElement {}

export default CDSStubElement;
