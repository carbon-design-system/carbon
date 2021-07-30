/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { create } from '@storybook/theming';
import { g10 } from '@carbon/themes';
import PackageInfo from './../package.json';

const {
  field01,
  interactive01,
  selectedUI,
  text01,
  inverse01,
  ui01,
  ui03,
  uiBackground,
} = g10;

export default create({
  base: 'light',

  colorPrimary: interactive01,
  colorSecondary: selectedUI,

  // UI
  appBg: uiBackground,
  appContentBg: ui01,
  appBorderColor: ui03,
  appBorderRadius: 0,

  // Typography
  fontBase: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  fontCode:
    "'IBM Plex Mono', Menlo, 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace",

  // Text colors
  textColor: text01,
  textInverseColor: inverse01,

  // Toolbar default and active colors
  barTextColor: text01,
  barSelectedColor: interactive01,
  barBg: uiBackground,

  // Form colors
  inputBg: field01,
  inputBorder: ui03,
  inputTextColor: text01,
  inputBorderRadius: 0,

  brandTitle: `@carbon/react@${PackageInfo.version}`,
  brandUrl:
    'https://github.com/carbon-design-system/carbon/tree/main/packages/carbon-react',
});
