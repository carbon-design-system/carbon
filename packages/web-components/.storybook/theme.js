/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from '@storybook/theming/create';
import { version } from '../package.json';

export default create({
  // Typography
  fontBase: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  fontCode:
    "'IBM Plex Mono', Menlo, 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace",
  brandTitle: `@carbon/web-components ${version}`,
  brandUrl:
    'https://github.com/carbon-design-system/carbon-for-ibm-dotcom/tree/main/packages/carbon-web-components',
});
