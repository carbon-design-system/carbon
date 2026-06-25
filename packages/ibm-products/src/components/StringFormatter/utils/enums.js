/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const deprecated_StringFormatterAlignment = {
  TOP: 'top',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  BOTTOM: 'bottom',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  LEFT: 'left',
  LEFT_BOTTOM: 'left-bottom',
  LEFT_TOP: 'left-top',
  RIGHT: 'right',
  RIGHT_BOTTOM: 'right-bottom',
  RIGHT_TOP: 'right-top',
};

export const StringFormatterAlignment = {
  TOP: 'top',
  TOP_START: 'top-start',
  TOP_END: 'top-end',
  BOTTOM: 'bottom',
  BOTTOM_START: 'bottom-start',
  BOTTOM_END: 'bottom-end',
  LEFT: 'left',
  LEFT_END: 'left-end',
  LEFT_START: 'left-start',
  RIGHT: 'right',
  RIGHT_END: 'right-end',
  RIGHT_START: 'right-start',
};

export const propMappingFunction = (deprecatedValue) => {
  const mapping = {
    [deprecated_StringFormatterAlignment.TOP_LEFT]:
      StringFormatterAlignment.TOP_START,
    [deprecated_StringFormatterAlignment.TOP_RIGHT]:
      StringFormatterAlignment.TOP_END,
    [deprecated_StringFormatterAlignment.BOTTOM_LEFT]:
      StringFormatterAlignment.BOTTOM_START,
    [deprecated_StringFormatterAlignment.BOTTOM_RIGHT]:
      StringFormatterAlignment.BOTTOM_END,
    [deprecated_StringFormatterAlignment.LEFT_BOTTOM]:
      StringFormatterAlignment.LEFT_END,
    [deprecated_StringFormatterAlignment.LEFT_TOP]:
      StringFormatterAlignment.LEFT_START,
    [deprecated_StringFormatterAlignment.RIGHT_BOTTOM]:
      StringFormatterAlignment.RIGHT_END,
    [deprecated_StringFormatterAlignment.RIGHT_START]:
      StringFormatterAlignment.RIGHT_START,
  };
  return mapping[deprecatedValue];
};
