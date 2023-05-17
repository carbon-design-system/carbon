/**
 * Copyright IBM Corp. 2018, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { breakpoint as bp, breakpoints } from '@carbon/layout';

const breakpointNames = Object.keys(breakpoints);

function next(name) {
  return breakpointNames[breakpointNames.indexOf(name) + 1];
}

export function fluid(selector) {
  const { breakpoints: fluidBreakpoints, ...styles } = selector;

  if (typeof fluidBreakpoints !== 'object') {
    return styles;
  }

  const fluidBreakpointNames = Object.keys(fluidBreakpoints);
  if (fluidBreakpointNames.length === 0) {
    return styles;
  }

  styles.fontSize = fluidTypeSize(styles, 'sm', fluidBreakpoints);

  fluidBreakpointNames.forEach((name) => {
    styles[bp(name)] = {
      ...fluidBreakpoints[name],
      fontSize: fluidTypeSize(styles, name, fluidBreakpoints),
    };
  });

  return styles;
}

function fluidTypeSize(defaultStyles, fluidBreakpointName, fluidBreakpoints) {
  const breakpoint = breakpoints[fluidBreakpointName];
  const fluidBreakpoint =
    fluidBreakpointName === 'sm'
      ? defaultStyles
      : fluidBreakpoints[fluidBreakpointName];

  let maxFontSize = defaultStyles.fontSize;
  let minFontSize = defaultStyles.fontSize;
  if (fluidBreakpoint.fontSize) {
    minFontSize = fluidBreakpoint.fontSize;
  }

  let maxViewportWidth = breakpoint.width;
  let minViewportWidth = breakpoint.width;

  let nextBreakpointAvailable = next(fluidBreakpointName);
  let nextFluidBreakpointName = null;

  while (nextBreakpointAvailable) {
    if (fluidBreakpoints[nextBreakpointAvailable]) {
      nextFluidBreakpointName = nextBreakpointAvailable;
      break;
    }
    nextBreakpointAvailable = next(nextBreakpointAvailable);
  }

  if (nextFluidBreakpointName) {
    const nextFluidBreakpoint = breakpoints[nextFluidBreakpointName];
    maxFontSize = fluidBreakpoints[nextFluidBreakpointName].fontSize;
    maxViewportWidth = nextFluidBreakpoint.width;

    return `calc(${minFontSize} + ${subtract(
      maxFontSize,
      minFontSize
    )} * ((100vw - ${minViewportWidth}) / ${subtract(
      maxViewportWidth,
      minViewportWidth
    )}))`;
  }

  return minFontSize;
}

function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);
}
