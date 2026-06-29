/**
 * Copyright IBM Corp. 2018, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { breakpoint as bp, breakpoints } from '@carbon/layout';
import type { BreakpointName } from '@carbon/layout';
import type { TypeStyle } from './types';

type TypeBreakpointStyles = Partial<TypeStyle>;

type TypeToken = TypeStyle & {
  breakpoints?: Partial<Record<BreakpointName, TypeBreakpointStyles>>;
};

type FluidResult = TypeStyle &
  Record<string, TypeBreakpointStyles | number | string | undefined>;

const breakpointNames = Object.keys(breakpoints) as BreakpointName[];

const next = (name: BreakpointName) => {
  return breakpointNames[breakpointNames.indexOf(name) + 1];
};

export const fluid = (selector: TypeToken): FluidResult => {
  const { breakpoints: fluidBreakpoints, ...baseStyles } = selector;
  const styles: FluidResult = { ...baseStyles };

  if (typeof fluidBreakpoints !== 'object' || fluidBreakpoints === null) {
    return styles;
  }

  const fluidBreakpointNames = Object.keys(
    fluidBreakpoints
  ) as BreakpointName[];
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
};

const fluidTypeSize = (
  defaultStyles: TypeStyle,
  fluidBreakpointName: BreakpointName,
  fluidBreakpoints: Partial<Record<BreakpointName, TypeBreakpointStyles>>
) => {
  const breakpoint = breakpoints[fluidBreakpointName];
  const fluidBreakpoint =
    fluidBreakpointName === 'sm'
      ? defaultStyles
      : fluidBreakpoints[fluidBreakpointName];

  const defaultFontSize = defaultStyles.fontSize ?? '';
  const breakpointFontSize = fluidBreakpoint?.fontSize;

  let maxFontSize = defaultFontSize;
  let minFontSize = defaultFontSize;
  if (breakpointFontSize) {
    minFontSize = breakpointFontSize;
  }

  let maxViewportWidth = breakpoint.width;
  const minViewportWidth = breakpoint.width;

  let nextBreakpointAvailable = next(fluidBreakpointName);
  let nextFluidBreakpointName: BreakpointName | null = null;

  while (nextBreakpointAvailable) {
    if (fluidBreakpoints[nextBreakpointAvailable]) {
      nextFluidBreakpointName = nextBreakpointAvailable;
      break;
    }
    nextBreakpointAvailable = next(nextBreakpointAvailable);
  }

  if (nextFluidBreakpointName) {
    const nextFluidBreakpoint = breakpoints[nextFluidBreakpointName];
    const nextFontSize = fluidBreakpoints[nextFluidBreakpointName]?.fontSize;

    if (!nextFontSize) {
      return minFontSize;
    }

    maxFontSize = nextFontSize;
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
};

const subtract = (a: string | number, b: string | number) => {
  return parseFloat(String(a)) - parseFloat(String(b));
};
