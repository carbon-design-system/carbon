/**
 * Copyright IBM Corp. 2024, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { addons } from 'storybook/manager-api';
import sbTheme from './theme';

addons.setConfig({
  theme: sbTheme,
});
