/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Tokens from the `white` theme are the default set
export * from './white';
import * as g10 from './g10';
import * as g100 from './g100';
import * as white from './white';

export { g10, g100, white };
export const themes = {
  g10,
  g100,
  white,
};
