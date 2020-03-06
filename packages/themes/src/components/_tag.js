/**
 * Copyright IBM Corp. 2018, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  // Red
  red20,
  red30,
  red70,
  red80,

  // Magenta
  magenta20,
  magenta30,
  magenta70,
  magenta80,

  // Purple
  purple20,
  purple30,
  purple70,
  purple80,

  // Blue
  blue20,
  blue30,
  blue70,
  blue80,

  // Cyan
  cyan20,
  cyan30,
  cyan70,
  cyan80,

  // Teal
  teal20,
  teal30,
  teal70,
  teal80,

  // Green
  green20,
  green30,
  green70,
  green80,

  // Gray
  gray20,
  gray30,
  gray70,
  gray80,

  // Cool gray
  coolGray20,
  coolGray30,
  coolGray70,
  coolGray80,

  // Warm gray
  warmGray20,
  warmGray30,
  warmGray70,
  warmGray80,
} from '@carbon/colors';

export const tokens = [
  'tagRedBackground',
  'tagRedColor',
  'tagRedHover',

  'tagMagentaBackground',
  'tagMagentaColor',
  'tagMagentaHover',

  'tagPurpleBackground',
  'tagPurpleColor',
  'tagPurpleHover',

  'tagBlueBackground',
  'tagBlueColor',
  'tagBlueHover',

  'tagCyanBackground',
  'tagCyanColor',
  'tagCyanHover',

  'tagTealBackground',
  'tagTealColor',
  'tagTealHover',

  'tagGreenBackground',
  'tagGreenColor',
  'tagGreenHover',

  'tagGrayBackground',
  'tagGrayColor',
  'tagGrayHover',

  'tagCoolGrayBackground',
  'tagCoolGrayColor',
  'tagCoolGrayHover',

  'tagWarmGrayBackground',
  'tagWarmGrayColor',
  'tagWarmGrayHover',
];

export const white = {
  tagRedBackground: red20,
  tagRedColor: red70,
  tagRedHover: red30,

  tagMagentaBackground: magenta20,
  tagMagentaColor: magenta70,
  tagMagentaHover: magenta30,

  tagPurpleBackground: purple20,
  tagPurpleColor: purple70,
  tagPurpleHover: purple30,

  tagBlueBackground: blue20,
  tagBlueColor: blue70,
  tagBlueHover: blue30,

  tagCyanBackground: cyan20,
  tagCyanColor: cyan70,
  tagCyanHover: cyan30,

  tagTealBackground: teal20,
  tagTealColor: teal70,
  tagTealHover: teal30,

  tagGreenBackground: green20,
  tagGreenColor: green70,
  tagGreenHover: green30,

  tagGrayBackground: gray20,
  tagGrayColor: gray70,
  tagGrayHover: gray30,

  tagCoolGrayBackground: coolGray20,
  tagCoolGrayColor: coolGray70,
  tagCoolGrayHover: coolGray30,

  tagWarmGrayBackground: warmGray20,
  tagWarmGrayColor: warmGray70,
  tagWarmGrayHover: warmGray30,
};

export const g10 = {
  ...white,
};

export const g90 = {
  tagRedBackground: red80,
  tagRedColor: red30,
  tagRedHover: red70,

  tagMagentaBackground: magenta80,
  tagMagentaColor: magenta30,
  tagMagentaHover: magenta70,

  tagPurpleBackground: purple80,
  tagPurpleColor: purple30,
  tagPurpleHover: purple70,

  tagBlueBackground: blue80,
  tagBlueColor: blue30,
  tagBlueHover: blue70,

  tagCyanBackground: cyan80,
  tagCyanColor: cyan30,
  tagCyanHover: cyan70,

  tagTealBackground: teal80,
  tagTealColor: teal30,
  tagTealHover: teal70,

  tagGreenBackground: green80,
  tagGreenColor: green30,
  tagGreenHover: green70,

  tagGrayBackground: gray80,
  tagGrayColor: gray30,
  tagGrayHover: gray70,

  tagCoolGrayBackground: coolGray80,
  tagCoolGrayColor: coolGray30,
  tagCoolGrayHover: coolGray70,

  tagWarmGrayBackground: warmGray80,
  tagWarmGrayColor: warmGray30,
  tagWarmGrayHover: warmGray70,
};

export const g100 = {
  ...g90,
};

export const v9 = {
  ...white,
};
