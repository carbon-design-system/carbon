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
import * as g90 from './g90';
import * as v9 from './v9';
import { tokens, formatTokenName, unstable__meta } from './tokens';

import * as components from './components';

export { g10, g90, g100, white, v9 };
export { tokens, formatTokenName, unstable__meta };

export const themes = {
  white: {
    ...white,
    ...components.white,
  },
  g10: {
    ...g10,
    ...components.g10,
  },
  g90: {
    ...g90,
    ...components.g90,
  },
  g100: {
    ...g100,
    ...components.g100,
  },
  v9: {
    ...v9,
    ...components.v9,
  },
};
