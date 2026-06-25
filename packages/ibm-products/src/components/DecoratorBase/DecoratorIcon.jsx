/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Import portions of React that are needed.
import React from 'react';

// Other standard imports.
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  Caution as High,
  ChevronMini as Critical,
  CircleFill as Benign,
  CircleStroke as Unknown,
  DiamondFill as Medium,
  SquareFill as Low,
} from '@carbon/react/icons';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--decorator-icon`;
const componentName = 'DecoratorIcon';

const defaults = {
  magnitude: 'unknown',
  small: false,
};

/**
 * The shape and color of the Decorator's icon.
 */
export let DecoratorIcon = React.forwardRef(
  (
    {
      className,
      magnitude = defaults.magnitude,
      small = defaults.small,
      ...rest
    },
    ref
  ) => {
    let Icon;

    switch (magnitude) {
      case 'benign':
        Icon = Benign;
        break;
      case 'low':
        Icon = Low;
        break;
      case 'medium':
        Icon = Medium;
        break;
      case 'high':
        Icon = High;
        break;
      case 'critical':
        Icon = Critical;
        break;
      default:
        Icon = Unknown;
        break;
    }

    return (
      <Icon
        {...rest}
        aria-hidden={true}
        className={cx(
          blockClass,
          className,
          `${blockClass}__magnitude-${magnitude}`,
          {
            [`${blockClass}--sm`]: small,
          }
        )}
        focusable={false}
        ref={ref}
        // Adding viewBox allows resizing `svg` elements via CSS.
        // The "ChevronMini" icon is half size,
        //   so set to '8 8 8 8' to match the size of the other icons.
        viewBox={magnitude === 'critical' ? '8 8 8 8' : '0 0 16 16'}
        {...getDevtoolsProps(componentName)}
      />
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
DecoratorIcon = pkg.checkComponentEnabled(DecoratorIcon, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
DecoratorIcon.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
DecoratorIcon.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,
  /**
   * Determines the shape and color of the icon.
   */
  magnitude: PropTypes.oneOf([
    'unknown',
    'benign',
    'low',
    'medium',
    'high',
    'critical',
  ]),
  /**
   * Reduce the size of the icon in proportion to a smaller Decorator.
   */
  small: PropTypes.bool,
};
