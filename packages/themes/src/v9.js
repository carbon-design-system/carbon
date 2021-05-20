/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { adjustLightness } from './tools';
import { white, red60, gray40 } from '@carbon/colors';

export const interactive01 = '#3d70b2';
export const interactive02 = '#4d5358';
export const interactive03 = '#3d70b2';
export const interactive04 = '#3d70b2';
export const uiBackground = '#f4f7fb';

export const ui01 = white;
export const ui02 = '#f4f7fb';
export const ui03 = '#dfe3e6';
export const ui04 = '#8897a2';
export const ui05 = '#5a6872';

export const text01 = '#152935';
export const text02 = '#5a6872';
export const text03 = '#cdd1d4';
export const text04 = white;
export const text05 = '#5a6872';
export const textError = '#e0182d';

export const icon01 = '#3d70b2';
export const icon02 = '#5a6872';
export const icon03 = white;

export const link01 = '#3d70b2';
export const link02 = '#3d70b2';

export const inverseLink = '#5596e6';

export const field01 = white;
export const field02 = '#f4f7fb';

export const inverse01 = white;
export const inverse02 = '#272d33';

export const support01 = '#e0182d';
export const support02 = '#5aa700';
export const support03 = '#efc100';
export const support04 = '#5aaafa';

export const inverseSupport01 = '#ff5050';
export const inverseSupport02 = '#8cd211';
export const inverseSupport03 = '#FDD600';
export const inverseSupport04 = '#5aaafa';

export const overlay01 = 'rgba(223, 227, 230, 0.5)';

export const danger01 = red60;
export const danger02 = red60;

// Interaction states
export const focus = '#3d70b2';
export const inverseFocusUi = '#3d70b2';

export const hoverPrimary = '#30588c';
export const activePrimary = '#30588c';

export const hoverPrimaryText = '#294c86';

export const hoverSecondary = '#4d5b65';
export const activeSecondary = '#414f59';

export const hoverTertiary = '#5a6872';
export const activeTertiary = '#414f59';

export const hoverUI = '#EEF4FC';
export const hoverLightUI = '#EEF4FC';
export const activeUI = '#DFEAFA';
export const activeLightUI = '#DFEAFA';
export const selectedUI = '#EEF4FC';
export const selectedLightUI = '#EEF4FC';
export const inverseHoverUI = '#4c4c4c';

export const hoverSelectedUI = '#DFEAFA';

export const hoverDanger = '#c70014';
export const activeDanger = '#AD1625';

export const hoverRow = '#eef4fc';

export const visitedLink = '#294c86';

export const disabled01 = '#fafbfd';
export const disabled02 = '#dfe3e6';
export const disabled03 = '#cdd1d4';

export const highlight = '#f4f7fb';

export const decorative01 = '#EEF4FC';

export const buttonSeparator = '#e0e0e0';

export const skeleton01 = 'rgba(61, 112, 178, .1)';
export const skeleton02 = 'rgba(61, 112, 178, .1)';

// New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens
export const background = uiBackground;
export const layer = ui01;
export const layerAccent = ui03;
export const layerAccentActive = gray40;
export const layerAccentHover = adjustLightness(layerAccent, -6);
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
