// @ts-check
/**
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { purple50, gray20, gray70 } from '@carbon/colors';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
import { Themes } from './Checklist.types';
import { clamp } from '../../global/js/utils/clamp';

const blockClass = `${pkg.prefix}--checklist__chart`;
const componentName = 'ChecklistChart';

const defaults = {
  theme: Themes.light,
};

/**
 * Custom chart component used within Checklist PLG component
 */
export let ChecklistChart = React.forwardRef(
  /**
   * @param {{className?: string, value: number, theme?: import('./Checklist.types').Theme}} props type description
   */
  ({ className, value, theme = defaults.theme, ...rest }, ref) => {
    const numDegrees = clamp(value * 360, 0, 360);
    const circleColor = theme === Themes.light ? gray20 : gray70; // $ui-03 (-ish)
    const progressColor = purple50;

    useEffect(() => {
      const ele = document.getElementsByClassName(`${blockClass}`);
      setTimeout(() => {
        for (const el of ele) {
          if (el instanceof HTMLElement) {
            el.style.setProperty(
              'background-image',
              `conic-gradient(${progressColor} ${numDegrees}deg, ${circleColor} ${numDegrees}deg 360deg)`
            );
            el.style.setProperty('border-radius', '50%');
          }
        }
      }, 0);
    });
    return (
      <div
        {...rest}
        className={cx(blockClass, className)}
        ref={ref}
        role="img"
        {...getDevtoolsProps(componentName)}
      />
    );
  }
);

ChecklistChart.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
ChecklistChart.propTypes = {
  /**
   * Optional class name for this component.
   */
  className: PropTypes.string,
  /**
   * Determines the theme of the component.
   */
  theme: PropTypes.oneOf([Themes.light, Themes.dark]),
  /**
   * Number between 0 and 1.
   */
  value: PropTypes.number.isRequired,
};
