/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as white from './white';
import * as g10 from './g10';
import * as g90 from './g90';
import * as g100 from './g100';
import * as v10 from './v10';
import * as buttonTokens from './component-tokens/button';
import * as tagTokens from './component-tokens/tag';
import * as notificationTokens from './component-tokens/notification';
import { formatTokenName } from './tools';
import { unstable_metadata } from './tokens';

const themes = {
  white,
  g10,
  g90,
  g100,
};

export * from './white';
export {
  white,
  g10,
  g90,
  g100,
  themes,
  v10,
  buttonTokens,
  tagTokens,
  notificationTokens,
  unstable_metadata,
  formatTokenName,
};
