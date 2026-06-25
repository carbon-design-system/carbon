/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import PropTypes from 'prop-types';
import { DecoratorBase } from '../DecoratorBase';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { prepareProps } from '../../global/js/utils/props-helper';
import { pkg } from '../../settings';

const componentName = 'Decorator';

/**
 * The Decorator groups a key/value pair as a single element. This component is not interactive.
 */
export let Decorator = React.forwardRef((props, ref) => {
  const validProps = prepareProps(props, [
    'disabled',
    'kind',
    'onClick',
    'onClickLabel',
    'onClickValue',
    'onContextMenu',
    'onContextMenuLabel',
    'onContextMenuValue',
  ]);

  return (
    <DecoratorBase
      ref={ref}
      {...validProps}
      kind="default"
      {...getDevtoolsProps(componentName)}
    />
  );
});

// Return a placeholder if not released and not enabled by feature flag
Decorator = pkg.checkComponentEnabled(Decorator, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
Decorator.displayName = componentName;

// The types and DocGen commentary for the component props,
// in alphabetical order (for consistency).
// See https://www.npmjs.com/package/prop-types#usage.
Decorator.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Do not show the icon, regardless of score.
   */
  hideIcon: PropTypes.bool,

  /**
   * The label for the data.
   */
  label: PropTypes.string,

  /**
   * Used in conjunction with `scoreThresholds`, determines the color, shape, and type of magnitude of the icon.
   *
   * If you don't want to show the icon at all, set `hideIcon={true}`.
   */
  score: PropTypes.number,

  /**
   * Used in conjunction with `score`, determines the color, shape, and type of magnitude of the icon.
   *
   * An array of 4 numbers determines the range of thresholds.
   *
   * Example using `[0, 4, 7, 10]`:
   * <br/>- `<= 0` "Benign"
   * <br/>- `1-3` "Low"
   * <br/>- `4-6` "Medium"
   * <br/>- `7-9` "High"
   * <br/>- `>= 10` "Critical"
   * <br/>- `NaN` "Unknown"
   */
  scoreThresholds: PropTypes.arrayOf(PropTypes.number),

  /**
   * Optional callback function for building a more detailed descriptive text.
   * Returns `score`, `scoreThresholds`, `magnitude`.
   *
   * Typical description is in the form of
   * '"(magnitude)" magnitude: score (score) out of (last element of scoreThresholds array)'.
   *
   * E.g. `"Medium" magnitude: score 5 out of 10`.
   *
   * If not defined, the title will default to the `label` prop.
   */
  setLabelTitle: PropTypes.func,

  /**
   * Styled smaller to better fit inline with text.
   */
  small: PropTypes.bool,

  /**
   * Override the default theme of the component.
   * Useful if you want "invert" the component's theme.
   */
  theme: PropTypes.oneOf(['light', 'dark']),

  /**
   * If not defined, it will behave as `display:inline-block`.
   */
  truncateValue: PropTypes.oneOfType([
    PropTypes.oneOf(['end', 'start']),
    PropTypes.shape({
      maxLength: PropTypes.number,
      front: PropTypes.number,
      back: PropTypes.number,
    }),
  ]),

  /**
   * The value of the data.
   */
  value: PropTypes.string.isRequired,

  /**
   * Overrides the default title for the Decorator's value.
   */
  valueTitle: PropTypes.string,
};
