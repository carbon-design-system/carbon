/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';

/**
 * A variant of `if-non-null` which stops rendering if the given value is an emptry string in addition to `null`/`undefined`.
 * @param The value.
 */
export default value => ifDefined(value === '' ? undefined : value ?? undefined);
