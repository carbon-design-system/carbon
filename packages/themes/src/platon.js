/**
 * Platon purple theme
 */

import {
  // Blue
  blue20,
  blue30,
  blue40,
  blue60,
  blue70,

  // platonColors.grey
  platonColors.grey10,
  platonColors.grey20,
  platonColors.grey20Hover,
  platonColors.grey30,
  platonColors.grey40,
  platonColors.grey50,
  platonColors.grey60,
  platonColors.grey70,
  platonColors.grey80,
  platonColors.grey100,

  // Support
  blue50,
  green40,
  green50,
  yellow30,
  orange40,
  red50,
  red60,
  purple60,

  // Constants
  white,
  whiteHover,
  platonColors.grey80Hover,
  platonColors.grey10Hover,
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
export const textPlaceholder = adjustAlpha(textPrimary, 0.4);
export const textHelper = platonColors.grey60;
export const textError = red60;
export const textInverse = white;
export const textOnColor = white;
export const textOnColorDisabled = platonColors.grey50;
export const textDisabled = adjustAlpha(textPrimary, 0.25);

// Link
export const linkPrimary = blue60;
export const linkPrimaryHover = blue70;
export const linkSecondary = blue70;
export const linkInverse = blue40;
export const linkVisited = purple60;
export const linkInverseActive = platonColors.grey10;
export const linkInverseHover = blue30;

// Icon
export const iconPrimary = platonColors.grey100;
export const iconSecondary = platonColors.grey70;
export const iconInverse = white;
export const iconOnColor = white;
export const iconOnColorDisabled = platonColors.grey50;
export const iconDisabled = adjustAlpha(iconPrimary, 0.25);
export const iconInteractive = blue60;

// Support
export const supportError = red60;
export const supportSuccess = green50;
export const supportWarning = yellow30;
export const supportInfo = blue70;
export const supportErrorInverse = red50;
export const supportSuccessInverse = green40;
export const supportWarningInverse = yellow30;
export const supportInfoInverse = blue50;
export const supportCautionMinor = yellow30;
export const supportCautionMajor = orange40;
export const supportCautionUndefined = purple60;

// Focus
export const focus = blue60;
export const focusInset = white;
export const focusInverse = white;

// Skeleton
export const skeletonBackground = whiteHover;
export const skeletonElement = platonColors.grey30;

// Misc
export const interactive = blue60;
export const highlight = blue20;
export const overlay = 'rgba(22, 22, 22, 0.5)';
export const toggleOff = platonColors.grey50;
export const shadow = 'rgba(0, 0, 0, 0.3)';

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
