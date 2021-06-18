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
  gray90,
  gray100,

  // Support
  green40,
  green50,
  yellow,
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

export const interactive01 = blue60;
export const interactive02 = gray60;
export const interactive03 = white;
export const interactive04 = blue50;

export const uiBackground = gray90;

export const ui01 = gray80;
export const ui02 = gray70;
export const ui03 = gray70;
export const ui04 = gray50;
export const ui05 = gray10;

export const text01 = gray10;
export const text02 = gray30;
export const text03 = gray60;
export const text04 = white;
export const text05 = gray50;
export const textError = red30;

export const icon01 = gray10;
export const icon02 = gray30;
export const icon03 = white;

export const link01 = blue40;
export const link02 = blue30;

export const inverseLink = blue60;

export const field01 = gray80;
export const field02 = gray70;

export const inverse01 = gray100;
export const inverse02 = gray10;

export const support01 = red40;
export const support02 = green40;
export const support03 = yellow;
export const support04 = blue50;

export const inverseSupport01 = red60;
export const inverseSupport02 = green50;
export const inverseSupport03 = yellow;
export const inverseSupport04 = blue60;

export const overlay01 = rgba(gray100, 0.7);

export const danger01 = red60;
export const danger02 = red40;

// Interaction states
export const focus = white;
export const inverseFocusUi = blue60;

export const hoverPrimary = '#0353e9';
export const activePrimary = blue80;

export const hoverPrimaryText = blue30;

export const hoverSecondary = '#606060';
export const activeSecondary = gray80;

export const hoverTertiary = gray10;
export const activeTertiary = gray30;

export const hoverUI = '#4c4c4c';
export const hoverLightUI = '#656565';
export const activeUI = gray60;
export const activeLightUI = gray50;
export const selectedUI = gray70;
export const selectedLightUI = gray60;
export const inverseHoverUI = '#e5e5e5';

export const hoverSelectedUI = '#656565';

export const hoverDanger = adjustLightness(danger01, -8);
export const activeDanger = red80;

export const hoverRow = '#4c4c4c';

export const visitedLink = purple40;

export const disabled01 = gray80;
export const disabled02 = gray60;
export const disabled03 = gray40;

export const highlight = blue70;

export const decorative01 = gray60;

export const buttonSeparator = '#161616';

export const skeleton01 = '#353535';
export const skeleton02 = gray70;

// New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens
export const background = uiBackground;
export const layer = ui01;
export const layerAccent = ui03;
export const layerAccentActive = gray50;
export const layerAccentHover = adjustLightness(layerAccent, +7);
export const field = field01;
export const backgroundInverse = inverse02;
export const backgroundBrand = interactive01;
export const interactive = interactive04;

export const borderSubtle = ui03;
export const borderStrong = ui04;
export const borderInverse = ui05;
export const borderInteractive = interactive04;

export const textPrimary = text01;
export const textSecondary = text02;
export const textPlaceholder = text03;
export const textHelper = text05;
export const textOnColor = text04;
export const textInverse = inverse01;

export const linkPrimary = link01;
export const linkSecondary = link02;
export const linkVisited = visitedLink;
export const linkInverse = inverseLink;

export const iconPrimary = icon01;
export const iconSecondary = icon02;
export const iconOnColor = icon03;
export const iconInverse = inverse01;

export const supportError = support01;
export const supportSuccess = support02;
export const supportWarning = support03;
export const supportInfo = support04;
export const supportErrorInverse = inverseSupport01;
export const supportSuccessInverse = inverseSupport02;
export const supportWarningInverse = inverseSupport03;
export const supportInfoInverse = inverseSupport04;

export const overlay = overlay01;
export const toggleOff = ui04;

export const buttonPrimary = interactive01;
export const buttonSecondary = interactive02;
export const buttonTertiary = interactive03;
export const buttonDangerPrimary = danger01;
export const buttonDangerSecondary = danger02;

export const backgroundActive = activeUI;
export const layerActive = activeUI;

export const buttonDangerActive = activeDanger;
export const buttonPrimaryActive = activePrimary;
export const buttonSecondaryActive = activeSecondary;
export const buttonTertiaryActive = activeTertiary;

export const focusInset = inverse01;
export const focusInverse = inverseFocusUi;

export const backgroundHover = hoverUI;
export const layerHover = hoverUI;
export const fieldHover = hoverUI;
export const backgroundInverseHover = inverseHoverUI;
export const linkPrimaryHover = hoverPrimaryText;
export const buttonDangerHover = hoverDanger;
export const buttonPrimaryHover = hoverPrimary;
export const buttonSecondaryHover = hoverSecondary;
export const buttonTertiaryHover = hoverTertiary;

export const backgroundSelected = selectedUI;
export const backgroundSelectedHover = hoverSelectedUI;
export const layerSelected = selectedUI;
export const layerSelectedHover = hoverSelectedUI;
export const layerSelectedInverse = ui05;
export const borderSubtleSelected = activeUI;

export const layerDisabled = disabled01;
export const fieldDisabled = disabled01;
export const borderDisabled = disabled01;

export const textDisabled = disabled02;
export const buttonDisabled = disabled02;
export const iconDisabled = disabled02;

export const textOnColorDisabled = disabled03;
export const iconOnColorDisabled = disabled03;
export const layerSelectedDisabled = disabled03;

export const skeletonBackground = skeleton01;
export const skeletonElement = skeleton02;

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
