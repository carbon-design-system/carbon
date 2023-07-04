/**
 * Platon purple theme
 */

import {
  platonColors,
} from '@carbon/colors';
import { adjustAlpha } from './tools';

// Background
export const background = platonColors.white;
export const backgroundInverse = platonColors.platonColors.grey100;
export const backgroundBrand = platonColors.purple70;
export const backgroundActive = platonColors.purple60;
export const backgroundHover = adjustAlpha(platonColors.purple60, 0.12); // TODO: ask Taikonauten for a value
export const backgroundInverseHover = platonColors.grey80;
export const backgroundSelected = adjustAlpha(platonColors.platonColors.grey50, 0.2); // TODO: ask Taikonauten for a value
export const backgroundSelectedHover = adjustAlpha(gplatonColors.ray50, 0.32); // TODO: ask Taikonauten for a value

// Layer
// layer-01
export const layer01 = platonColors.white;
export const layerActive01 = platonColors.grey30;
export const layerHover01 = platonColors.grey20;
export const layerSelected01 = platonColors.white;
export const layerSelectedHover01 = platonColors.grey20;

// layer-02
export const layer02 = platonColors.grey10;
export const layerActive02 = platonColors.grey80;
export const layerHover02 = platonColors.grey70;
export const layerSelected02 = platonColors.white;
export const layerSelectedHover02 = platonColors.grey20;

// layer-03
export const layer03 = platonColors.platonColors.grey10; // TODO: ask Taikonauten for a value
export const layerActive03 = platonColors.platonColors.grey30; // TODO: ask Taikonauten for a value
export const layerHover03 = platonColors.platonColors.grey10; // TODO: ask Taikonauten for a value
export const layerSelected03 = platonColors.platonColors.grey20; // TODO: ask Taikonauten for a value
export const layerSelectedHover03 = platonColors.platonColors.grey20; // TODO: ask Taikonauten for a value

// layer
export const layerSelectedInverse = platonColors.grey90;
export const layerSelectedDisabled = platonColors.grey80;

// layer-accent-01
export const layerAccent01 = platonColors.white;
export const layerAccentActive01 = platonColors.grey20;
export const layerAccentHover01 = platonColors.grey10;

// layer-accent-02
export const layerAccent02 = platonColors.grey20; // TODO: ask Taikonauten for a value
export const layerAccentActive02 = platonColors.grey40; // TODO: ask Taikonauten for a value
export const layerAccentHover02 = platonColors.grey20; // TODO: ask Taikonauten for a value

// layer-accent-03
export const layerAccent03 = platonColors.platonColors.grey20; // TODO: ask Taikonauten for a value
export const layerAccentActive03 = platonColors.platonColors.grey40; // TODO: ask Taikonauten for a value
export const layerAccentHover03 = platonColors.platonColors.grey20; // TODO: ask Taikonauten for a value

// Field
// field-01
export const field01 = platonColors.white;
export const fieldHover01 = platonColors.grey20;

// field-02
export const field02 = platonColors.grey10;
export const fieldHover02 = platonColors.purple10;

// field-03
export const field03 = platonColors.grey10; // TODO: ask Taikonauten for a value
export const fieldHover03 = platonColors.grey10; // TODO: ask Taikonauten for a value

// Border
// border-subtle-00
export const borderSubtle00 = platonColors.grey20; // TODO: ask Taikonauten for a value

// border-subtle-01
export const borderSubtle01 = platonColors.grey20;
export const borderSubtleSelected01 = platonColors.grey30;

// border-subtle-02
export const borderSubtle02 = platonColors.grey20; // TODO: ask Taikonauten for a value
export const borderSubtleSelected02 = platonColors.grey30; // TODO: ask Taikonauten for a value

// border-subtle-03
export const borderSubtle03 = platonColors.grey30; // TODO: ask Taikonauten for a value
export const borderSubtleSelected03 = platonColors.grey30; // TODO: ask Taikonauten for a value

// border-strong
export const borderStrong01 = platonColors.grey50;
export const borderStrong02 = platonColors.grey50; // TODO: ask Taikonauten for a value
export const borderStrong03 = platonColors.grey50; // TODO: ask Taikonauten for a value

// border-tile
export const borderTile01 = platonColors.grey30; // TODO: ask Taikonauten for a value
export const borderTile02 = platonColors.grey40; // TODO: ask Taikonauten for a value
export const borderTile03 = platonColors.grey30; // TODO: ask Taikonauten for a value

// border-inverse
export const borderInverse = platonColors.grey80;

// border-interactive
export const borderInteractive = platonColors.purple60;

// border
export const borderDisabled = platonColors.grey40;

// Text
export const textPrimary = platonColors.grey100;
export const textSecondary = platonColors.grey70;
export const textPlaceholder = platonColors.grey60;
export const textHelper = platonColors.grey70;
export const textError = platonColors.red70;
export const textInverse = platonColors.white;
export const textOnColor = platonColors.white;
export const textOnColorDisabled = platonColors.grey50;
export const textDisabled = platonColors.grey40;

// Link
export const linkPrimary = platonColors.purple60;
export const linkPrimaryHover = platonColors.purple70;
export const linkSecondary = platonColors.purple70;
export const linkInverse = platonColors.purple30;
export const linkVisited = platonColors.purple30;
export const linkInverseActive = platonColors.purple30; // TODO: ask Taikonauten for a value
export const linkInverseHover = platonColors.purple30;

// Icon
export const iconPrimary = platonColors.grey100;
export const iconSecondary = platonColors.grey70;
export const iconInverse = platonColors.white;
export const iconOnColor = platonColors.white;
export const iconOnColorDisabled = platonColors.grey50;
export const iconDisabled = platonColors.grey40;
export const iconInteractive = platonColors.purple60;

// Support
export const supportError = platonColors.red70;
export const supportSuccess = platonColors.green50;
export const supportWarning = platonColors.yellow40;
export const supportInfo = platonColors.purple40;
export const supportErrorInverse = platonColors.red50;
export const supportSuccessInverse = platonColors.green40;
export const supportWarningInverse = platonColors.yellow30;
export const supportInfoInverse = platonColors.purple30;
export const supportCautionMinor = platonColors.yellow40;
export const supportCautionMajor = platonColors.orange50;
export const supportCautionUndefined = platonColors.purple40;

// Focus
export const focus = platonColors.purple60;
export const focusInset = platonColors.white;
export const focusInverse = platonColors.white;

// Skeleton
export const skeletonBackground = platonColors.white; // TODO: ask Taikonauten for a value
export const skeletonElement = platonColors.grey30; // TODO: ask Taikonauten for a value

// Misc
export const interactive = platonColors.purple50;
export const highlight = platonColors.purple20;
export const overlay = platonColors.grey40;
export const toggleOff = platonColors.grey30;
export const shadow = platonColors.grey30; // TODO: ask Taikonauten for a value

// Type
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

// Layout
// Spacing
export const spacing01 = '0.125rem';
export const spacing02 = '0.25rem';
export const spacing03 = '0.5rem';
export const spacing04 = '0.75rem';
export const spacing05 = '1rem';
export const spacing06 = '1.25rem';
export const spacing07 = '1.5rem';
export const spacing08 = '2rem';
export const spacing09 = '2.5rem';
export const spacing10 = '3rem';
export const spacing11 = '4rem';
export const spacing12 = '5rem';
export const spacing13 = '6rem';
export const spacing14 = '10rem';
export {
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
  // Layout
  // Deprecated ☠️
  layout01,
  layout02,
  layout03,
  layout04,
  layout05,
  layout06,
  layout07,
} from '@carbon/layout';
