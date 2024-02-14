/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  // Blue
  blue20,
  blue20Hover,
  blue40,
  blue60,
  blue70,
  blue80,
  blue100,

  // Gray
  gray10,
  gray10Hover,
  gray20,
  gray30,
  gray30Hover,
  gray40,
  gray50,
  gray60,
  gray60Hover,
  gray70,
  gray70Hover,
  gray80,
  gray80Hover,
  gray90,
  gray90Hover,
  gray100,

  // Support
  blue30,
  blue50,
  green40,
  green50,
  yellow30,
  orange40,
  red40,
  red50,
  red60,
  purple40,
  purple50,

  // Constants
  white,
  black,

  // Tools
  rgba,
} from '@carbon/colors';
import { adjustLightness, adjustAlpha } from './tools';

// Background
export const background = gray100;
export const backgroundInverse = gray10;
export const backgroundBrand = blue60;
export const backgroundActive = adjustAlpha(gray50, 0.4);
export const backgroundHover = adjustAlpha(gray50, 0.16);
export const backgroundInverseHover = gray10Hover;
export const backgroundSelected = adjustAlpha(gray50, 0.24);
export const backgroundSelectedHover = adjustAlpha(gray50, 0.32);

// Layer
// layer-01
export const layer01 = gray90;
export const layerActive01 = gray70;
export const layerHover01 = gray90Hover;
export const layerSelected01 = gray80;
export const layerSelectedHover01 = gray80Hover;

// layer-02
export const layer02 = gray80;
export const layerActive02 = gray60;
export const layerHover02 = gray80Hover;
export const layerSelected02 = gray70;
export const layerSelectedHover02 = gray70Hover;

// layer-03
export const layer03 = gray70;
export const layerActive03 = gray50;
export const layerHover03 = gray70Hover;
export const layerSelected03 = gray60;
export const layerSelectedHover03 = gray60Hover;

// layer
export const layerSelectedInverse = gray10;
export const layerSelectedDisabled = gray40;

// layer-accent-01
export const layerAccent01 = gray80;
export const layerAccentActive01 = gray60;
export const layerAccentHover01 = gray80Hover;

// layer-accent-02
export const layerAccent02 = gray70;
export const layerAccentActive02 = gray50;
export const layerAccentHover02 = gray70Hover;

// layer-accent-03
export const layerAccent03 = gray60;
export const layerAccentActive03 = gray80;
export const layerAccentHover03 = gray60Hover;

// Field
// field-01
export const field01 = gray90;
export const fieldHover01 = gray90Hover;

// field-02
export const field02 = gray80;
export const fieldHover02 = gray80Hover;

// field-03
export const field03 = gray70;
export const fieldHover03 = gray70Hover;

// Border
// border-subtle-00
export const borderSubtle00 = gray80;

// border-subtle-01
export const borderSubtle01 = gray70;
export const borderSubtleSelected01 = gray60;

// border-subtle-02
export const borderSubtle02 = gray60;
export const borderSubtleSelected02 = gray50;

// border-subtle-03
export const borderSubtle03 = gray60;
export const borderSubtleSelected03 = gray50;

// border-strong
export const borderStrong01 = gray60;
export const borderStrong02 = gray50;
export const borderStrong03 = gray40;

// border-tile
export const borderTile01 = gray70;
export const borderTile02 = gray60;
export const borderTile03 = gray50;

// border-inverse
export const borderInverse = gray10;

// border-interactive
export const borderInteractive = blue50;

// border
export const borderDisabled = adjustAlpha(gray50, 0.5);

// Text
export const textPrimary = gray10;
export const textSecondary = gray30;
export const textPlaceholder = adjustAlpha(textPrimary, 0.4);
export const textHelper = gray40;
export const textError = red40;
export const textInverse = gray100;
export const textOnColor = white;
export const textOnColorDisabled = adjustAlpha(textOnColor, 0.25);
export const textDisabled = adjustAlpha(textPrimary, 0.25);

// Link
export const linkPrimary = blue40;
export const linkPrimaryHover = blue30;
export const linkSecondary = blue30;
export const linkInverse = blue60;
export const linkVisited = purple40;
export const linkInverseActive = gray100;
export const linkInverseHover = blue70;

// Icon
export const iconPrimary = gray10;
export const iconSecondary = gray30;
export const iconInverse = gray100;
export const iconOnColor = white;
export const iconOnColorDisabled = adjustAlpha(iconOnColor, 0.25);
export const iconDisabled = adjustAlpha(iconPrimary, 0.25);
export const iconInteractive = white;

// Support
export const supportError = red50;
export const supportSuccess = green40;
export const supportWarning = yellow30;
export const supportInfo = blue50;
export const supportErrorInverse = red60;
export const supportSuccessInverse = green50;
export const supportWarningInverse = yellow30;
export const supportInfoInverse = blue70;
export const supportCautionMinor = yellow30;
export const supportCautionMajor = orange40;
export const supportCautionUndefined = purple50;

// Focus
export const focus = white;
export const focusInset = gray100;
export const focusInverse = blue60;

// Skeleton
export const skeletonBackground = adjustLightness(background, 7);
export const skeletonElement = gray80;

// Misc
export const interactive = blue50;
export const highlight = blue80;
export const overlay = rgba(black, 0.65);
export const toggleOff = gray60;
export const shadow = rgba(black, 0.8);

//// AI - Experimental (Use at your own risk)
// Slug tokens
export const slugBackground = gray30;
export const slugGradient = `${gray50} linear-gradient(135deg, ${gray10} 0%, rgba(${white}, 0) 100%)`;
export const slugBackgroundHover = gray20;
export const slugGradientHover = `${gray40} linear-gradient(135deg, ${white} 0%, rgba(${white}, 0) 100%)`;
export const slugHollowHover = gray30Hover;

//// Phase 2 - new \\\\
// Shared
export const aiInnerShadow = rgba(blue50, 0.2);
export const aiAuraStartTable = rgba(blue50, 0.15);
export const aiAuraStart = rgba(blue50, 0.1);
export const aiAuraEnd = rgba(black, 0);
export const aiBorderStrong = blue40;
export const aiBorderStart = blue50;
export const aiBorderEnd = rgba(blue30, 0.24);
export const aiDropShadow = rgba(blue60, 0.32);
export const aiAuraHoverBackground = layerHover01;
export const aiAuraHoverStart = rgba(blue50, 0.4);
export const aiAuraHoverEnd = rgba(black, 0);

// Callout
export const slugCalloutShadowOuter01 = rgba(blue80, 0.25);
export const slugCalloutShadowOuter02 = rgba(black, 0.65);

// AI Modal tokens
export const aiOverlay = rgba(blue100, 0.5);

//// Not used in phase 2 / possibly remove?
export const slugCalloutGradientTop = rgba(gray100, 0.85);
export const slugCalloutGradientBottom = rgba(gray90, 0.85);
export const aiGradientStart01 = rgba(blue20, 0.2);
export const aiGradientStart02 = 'transparent';
export const aiGradientEnd = 'rgba(38, 38, 38, 0)';
export const slugCalloutAuraStart = aiAuraStart;
export const slugCalloutAuraEnd = aiAuraEnd;
export const slugCalloutGradientTopHover = rgba(gray80, 0.55);
export const slugCalloutGradientBottomHover = rgba(gray80Hover, 0.55);
export const slugCalloutAuraStartHover01 = rgba(blue20Hover, 0.3);
export const slugCalloutAuraEndHover01 = rgba(gray100, 0);
export const slugCalloutAuraStartHover02 = 'transparent';
export const slugCalloutAuraEndHover02 = 'transparent';
export const slugCalloutGradientTopSelected = rgba(gray80, 0.85);
export const slugCalloutGradientBottomSelected = rgba(gray80Hover, 0.85);
export const slugCalloutAuraStartSelected = rgba(blue20, 0.2);
export const slugCalloutAuraEndSelected = rgba(gray100, 0);

// One off tokens for caret
export const slugCalloutCaretCenter = '#3F68AF';
export const slugCalloutCaretBottom = '#3D4655';
export const slugCalloutCaretBottomBackgroundActions = '#192436';
export const slugCalloutCaretBottomBackground = '#213250';

// Chat tokens
export const chatPromptBackground = gray100;
export const chatPromptBorderStart = gray90;
export const chatPromptBorderEnd = rgba(gray90, 0);
export const chatBubbleUser = gray80;
export const chatBubbleAgent = gray90;
export const chatBubbleAgentBorder = gray70;
export const chatAvatarBot = gray50;
export const chatAvatarAgent = gray30;
export const chatAvatarUser = blue50;

export {
  // Type
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
  // Layout
  // Spacing
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
} from './white';
