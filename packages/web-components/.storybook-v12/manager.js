/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addons } from 'storybook/manager-api';
import theme from './theme';

addons.setConfig({
  theme,
});

localStorage.removeItem('@storybook/ui/store');
localStorage.removeItem('storybook-layout');
