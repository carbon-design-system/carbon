/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { gray20, gray20Hover, gray50, white, rgba } from '@carbon/colors';
const transparent = 'rgba(0, 0, 0, 0)';
export const contentSwitcherSelected = {
  whiteTheme: white,
  g10: white,
  g90: rgba(gray50, 0.24),
  g100: rgba(gray50, 0.24),
};

export const contentSwitcherBackground = {
  whiteTheme: gray20,
  g10: gray20,
  g90: transparent,
  g100: transparent,
};

export const contentSwitcherBackgroundHover = {
  whiteTheme: gray20Hover,
  g10: gray20Hover,
  g90: rgba(gray50, 0.12),
  g100: rgba(gray50, 0.12),
};
