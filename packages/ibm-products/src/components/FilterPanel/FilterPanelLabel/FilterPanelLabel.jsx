/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../../global/js/utils/devtools';
import { pkg } from '../../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--filter-panel-label`;
const componentName = 'FilterPanelLabel';

/**
 * A container with a label and optional count.
 */
export let FilterPanelLabel = React.forwardRef(
  ({ className, count, labelText, title, ...rest }, ref) => {
    return (
      <span
        {...rest}
        className={cx(blockClass, className)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        <span className={`${blockClass}__text`} title={title}>
          {labelText}
        </span>
        {count && <span className={`${blockClass}__count`}>{count}</span>}{' '}
      </span>
    );
  }
);

// Return a placeholder if not released and not enabled by feature flag
FilterPanelLabel = pkg.checkComponentEnabled(FilterPanelLabel, componentName);

FilterPanelLabel.displayName = componentName;

FilterPanelLabel.propTypes = {
  /**
   * Optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Number to be displayed with the label.
   */
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * The label for the component.
   */
  labelText: PropTypes.node.isRequired,

  /**
   * Optional title attribute for the label.
   */
  title: PropTypes.string,
};
