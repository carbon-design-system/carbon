/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @internal
 * This module is for internal use by @carbon/react and @carbon/web-components only.
 * It is not part of the public @carbon/utilities API.
 *
 * Import from source path:
 * import { ... } from '@carbon/utilities/src/date-picker';
 */

// The primitives below are built on Temporal, which is still unevenly shipped:
// no version of Safari implements it, and Chrome/Edge only gained it in 144.
// Every `Temporal.*` reference in this module tree is a bare global, so on those engines
// the first access — `Temporal.Now.plainDateISO()` on the calendar-open transition
// throws a ReferenceError and the calendar never opens.
//
// `temporal-polyfill/global` installs `globalThis.Temporal` only when the engine
// does not already provide it, so a native implementation always wins. It is
// imported first so the global exists before any primitive can reach for it.
import 'temporal-polyfill/global';

// Export date picker primitives
export * from './primitives/index.js';
