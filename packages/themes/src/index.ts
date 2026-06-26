/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// The imports below reference build artifacts in js/generated/ that are
// produced by `yarn build:js-tokens` (tasks/generate-js-tokens.js) before
// this file is bundled. Run `yarn build` to generate them first.
import * as white from '../js/generated/themes/white.js';
import * as g10 from '../js/generated/themes/g10.js';
import * as g90 from '../js/generated/themes/g90.js';
import * as g100 from '../js/generated/themes/g100.js';
import * as v10 from './v10';
import * as buttonTokens from '../js/generated/component-tokens/button.js';
import * as tagTokens from '../js/generated/component-tokens/tag.js';
import * as notificationTokens from '../js/generated/component-tokens/notification.js';
import * as statusTokens from '../js/generated/component-tokens/status.js';
import * as contentSwitcherTokens from '../js/generated/component-tokens/content-switcher.js';
import { formatTokenName } from './tools';
import { unstable_metadata } from './tokens';

const themes = {
  white,
  g10,
  g90,
  g100,
};

export * from '../js/generated/themes/white.js';
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
  statusTokens,
  contentSwitcherTokens,
  unstable_metadata,
  formatTokenName,
};

// Re-export type and layout tokens that were previously re-exported via
// white.ts to preserve backward compatibility with @carbon/themes consumers.
export {
  caption01,
  caption02,
  label01,
  label02,
  helperText01,
  helperText02,
  bodyShort01,
  bodyLong01,
  bodyShort02,
  bodyLong02,
  code01,
  code02,
  heading01,
  productiveHeading01,
  heading02,
  productiveHeading02,
  productiveHeading03,
  productiveHeading04,
  productiveHeading05,
  productiveHeading06,
  productiveHeading07,
  expressiveHeading01,
  expressiveHeading02,
  expressiveHeading03,
  expressiveHeading04,
  expressiveHeading05,
  expressiveHeading06,
  expressiveParagraph01,
  quotation01,
  quotation02,
  display01,
  display02,
  display03,
  display04,
} from '@carbon/type';
export {
  spacing01,
  spacing02,
  spacing03,
  spacing04,
  spacing05,
  spacing06,
  spacing07,
  spacing08,
  spacing09,
  spacing10,
  spacing11,
  spacing12,
  spacing13,
  // Fluid spacing
  fluidSpacing01,
  fluidSpacing02,
  fluidSpacing03,
  fluidSpacing04,
  // Containers
  container01,
  container02,
  container03,
  container04,
  container05,
  sizeXSmall,
  sizeSmall,
  sizeMedium,
  sizeLarge,
  sizeXLarge,
  size2XLarge,
  // Icon sizes
  iconSize01,
  iconSize02,
  // Layout (deprecated)
  layout01,
  layout02,
  layout03,
  layout04,
  layout05,
  layout06,
  layout07,
} from '@carbon/layout';
