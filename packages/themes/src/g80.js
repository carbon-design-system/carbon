/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { adjustLightness } from './tools';

import {
  // Blue
  blue30,
  blue40,
  blue50,
  blue60,
  blue70,
  blue80,

  // Gray
  gray10,
  gray30,
  gray40,
  gray50,
  gray60,
  gray70,
  gray80,
  gray100,

  // Support
  green40,
  green50,
  yellow30,
  red30,
  red40,
  red60,
  red80,
  purple40,

  // Constants
  white,

  // Tools
  rgba,
} from '@carbon/colors';

// New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens
export const background = gray80;
export const layer = gray70;
export const layerAccent = gray60;
export const layerAccentActive = gray70;
export const layerAccentHover = adjustLightness(layerAccent, -7);
export const field = gray70;
export const backgroundInverse = gray10;
export const backgroundBrand = blue60;
export const interactive = blue40;

export const borderSubtle = gray60;
export const borderStrong = gray40;
export const borderInverse = gray10;
export const borderInteractive = blue50;

export const textPrimary = gray10;
export const textSecondary = gray30;
export const textPlaceholder = gray60;
export const textHelper = gray40;
export const textError = red30;
export const textOnColor = white;
export const textInverse = gray100;

export const linkPrimary = blue40;
export const linkSecondary = blue30;
export const linkVisited = purple40;
export const linkInverse = blue60;

export const iconPrimary = gray10;
export const iconSecondary = gray30;
export const iconOnColor = white;
export const iconInverse = gray100;

export const supportError = red40;
export const supportSuccess = green40;
export const supportWarning = yellow30;
export const supportInfo = blue50;
export const supportErrorInverse = red60;
export const supportSuccessInverse = green50;
export const supportWarningInverse = yellow30;
export const supportInfoInverse = blue60;

export const overlay = rgba(gray100, 0.7);
export const toggleOff = gray50;

export const buttonPrimary = blue60;
export const buttonSecondary = gray60;
export const buttonTertiary = white;
export const buttonDangerPrimary = red60;
export const buttonDangerSecondary = red40;
export const buttonSeparator = gray100;

export const backgroundActive = gray70;
export const layerActive = gray60;

export const buttonDangerActive = red80;
export const buttonPrimaryActive = blue80;
export const buttonSecondaryActive = gray70;
export const buttonTertiaryActive = gray30;

export const focus = white;
export const focusInset = gray100;
export const focusInverse = blue60;
export const highlight = blue70;

export const backgroundHover = adjustLightness(background, +6);
export const layerHover = adjustLightness(layer, +7);
export const fieldHover = adjustLightness(field, +7);
export const backgroundInverseHover = adjustLightness(backgroundInverse, -5);

export const linkPrimaryHover = blue30;

export const buttonDangerHover = adjustLightness(buttonDangerPrimary, -8);
export const buttonPrimaryHover = adjustLightness(buttonPrimary, -8);
export const buttonSecondaryHover = adjustLightness(buttonSecondary, -7);
export const buttonTertiaryHover = white;

export const backgroundSelected = gray70;
export const backgroundSelectedHover = adjustLightness(backgroundSelected, +7);
export const layerSelected = gray60;
export const layerSelectedHover = adjustLightness(layerSelected, -6);
export const layerSelectedInverse = gray10;
export const borderSubtleSelected = gray50;

export const layerDisabled = gray70;
export const fieldDisabled = gray70;
export const borderDisabled = gray70;

export const textDisabled = gray50;
export const buttonDisabled = gray50;
export const iconDisabled = gray50;

export const textOnColorDisabled = gray30;
export const iconOnColorDisabled = gray30;
export const layerSelectedDisabled = gray30;

export const skeletonBackground = adjustLightness(background, +6);
export const skeletonElement = gray60;

//////////////////////////////////////
// Old tokens needed to pass tests  //
//////////////////////////////////////
export const interactive01 = backgroundBrand;
export const interactive02 = buttonSecondary;
export const interactive03 = buttonTertiary;
export const interactive04 = interactive;

export const uiBackground = background;

export const ui01 = layer;
export const ui02 = gray70;
export const ui03 = layerAccent;
export const ui04 = borderStrong;
export const ui05 = borderInverse;

export const text01 = textPrimary;
export const text02 = textSecondary;
export const text03 = textPlaceholder;
export const text04 = textOnColor;
export const text05 = textHelper;

export const icon01 = iconPrimary;
export const icon02 = iconSecondary;
export const icon03 = iconOnColor;

export const link01 = linkPrimary;
export const link02 = linkSecondary;

export const inverseLink = linkInverse;

export const field01 = field;
export const field02 = gray60;

export const inverse01 = textInverse;
export const inverse02 = backgroundInverse;

export const support01 = supportError;
export const support02 = supportSuccess;
export const support03 = supportWarning;
export const support04 = supportInfo;

export const inverseSupport01 = supportErrorInverse;
export const inverseSupport02 = supportSuccessInverse;
export const inverseSupport03 = supportWarningInverse;
export const inverseSupport04 = supportInfoInverse;

export const overlay01 = overlay;

export const danger01 = buttonDangerPrimary;
export const danger02 = buttonDangerSecondary;

// Interaction states
export const inverseFocusUi = focusInverse;

export const hoverPrimary = buttonPrimaryHover;
export const activePrimary = buttonPrimaryActive;

export const hoverPrimaryText = linkPrimaryHover;

export const hoverSecondary = buttonSecondaryHover;
export const activeSecondary = buttonSecondaryActive;

export const hoverTertiary = buttonTertiaryHover;
export const activeTertiary = buttonTertiaryActive;

export const hoverUI = backgroundHover;
export const hoverLightUI = '#5E5E5E';
export const activeUI = backgroundActive;
export const activeLightUI = gray50;
export const selectedUI = backgroundSelected;
export const selectedLightUI = gray50;
export const inverseHoverUI = backgroundInverseHover;

export const hoverSelectedUI = layerSelectedHover;

export const hoverDanger = buttonDangerHover;
export const activeDanger = buttonDangerActive;

export const hoverRow = layerHover;

export const visitedLink = linkVisited;

export const disabled01 = layerDisabled;
export const disabled02 = textDisabled;
export const disabled03 = textOnColorDisabled;

export const decorative01 = gray60;

export const skeleton01 = skeletonBackground;
export const skeleton02 = skeletonElement;

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
  // Layout
  // Deprecated -- Remove in v11
  layout01,
  layout02,
  layout03,
  layout04,
  layout05,
  layout06,
  layout07,
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
} from './white';

// Deprecated ☠️
export const brand01 = interactive01;
export const brand02 = interactive02;
export const brand03 = interactive03;
export const active01 = activeUI;
export const hoverField = hoverUI;
export const danger = danger01;
