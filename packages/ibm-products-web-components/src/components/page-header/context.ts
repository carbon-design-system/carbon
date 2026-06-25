/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createContext } from '@lit/context';

export const pageHeaderContext = createContext({
  headerOffset: 0,
  breadcrumbOffset: 0,
  fullyCollapsed: false,
  root: null,
  titleClipped: false,
  disableStickyTabBar: false,
});
