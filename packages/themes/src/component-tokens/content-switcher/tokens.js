import { gray20, gray20Hover, gray50, white } from '@carbon/colors';
const transparent = 'rgba(0, 0, 0, 0)';
const contentSwitcherSelected = {
  whiteTheme: white,
  g10: white,
  g90: gray50,
  g100: gray50,
};

const contentSwitcherBackground = {
  whiteTheme: gray20,
  g10: gray20,
  g90: transparent,
  g100: transparent,
};

const contentSwitcherBackgroundHover = {
  whiteTheme: gray20Hover,
  g10: gray20Hover,
  g90: gray50,
  g100: gray50,
};

export {
  contentSwitcherSelected,
  contentSwitcherBackground,
  contentSwitcherBackgroundHover,
};
