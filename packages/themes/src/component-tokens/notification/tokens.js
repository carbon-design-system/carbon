import {
  red10,
  gray80,
  gray90,
  green10,
  blue10,
  yellow30,
  white0,
} from '@carbon/colors';
import {
  textInverse as textInverseWhite,
  textOnColorDisabled as textOnColorDisabledWhite,
} from '../../white';
import {
  textInverse as textInverseG10,
  textOnColorDisabled as textOnColorDisabledG10,
} from '../../g10';
import {
  textInverse as textInverseG90,
  textOnColorDisabled as textOnColorDisabledG90,
} from '../../g90';
import {
  textInverse as textInverseG100,
  textOnColorDisabled as textOnColorDisabledG100,
} from '../../g100';
import {
  buttonTertiaryActive,
  buttonTertiaryHover,
  buttonTertiary,
} from '../button/tokens';

export const notificationBackgroundError = {
  whiteTheme: red10,
  g10: red10,
  g90: gray80,
  g100: gray90,
};

export const notificationBackgroundSuccess = {
  whiteTheme: green10,
  g10: green10,
  g90: gray80,
  g100: gray90,
};

export const notificationBackgroundInfo = {
  whiteTheme: blue10,
  g10: blue10,
  g90: gray80,
  g100: gray90,
};

export const colorMap = {
  yellow30,
  white0,
};

export const notificationBackgroundWarning = {
  whiteTheme: colorMap,
  g10: colorMap,
  g90: gray80,
  g100: gray90,
};

export const notificationActionHover = {
  whiteTheme: white0,
  g10: white0,
};

export const notificationActionTertiaryInverse = {
  whiteTheme: buttonTertiary.g100,
  g10: buttonTertiary.g90,
  g90: buttonTertiary.g10,
  g100: buttonTertiary.whiteTheme,
};

export const notificationActionTertiaryInverseActive = {
  whiteTheme: buttonTertiaryActive.g100,
  g10: buttonTertiaryActive.g90,
  g90: buttonTertiaryActive.g10,
  g100: buttonTertiaryActive.whiteTheme,
};

export const notificationActionTertiaryInverseHover = {
  whiteTheme: buttonTertiaryHover.g100,
  g10: buttonTertiaryHover.g90,
  g90: buttonTertiaryHover.g10,
  g100: buttonTertiaryHover.whiteTheme,
};

export const notificationActionTertiaryInverseText = {
  whiteTheme: textInverseG100,
  g10: textInverseG90,
  g90: textInverseG10,
  g100: textInverseWhite,
};

export const notificationActionTertiaryInverseTextOnColorDisabled = {
  whiteTheme: textOnColorDisabledG100,
  g10: textOnColorDisabledG90,
  g90: textOnColorDisabledG10,
  g100: textOnColorDisabledWhite,
};
