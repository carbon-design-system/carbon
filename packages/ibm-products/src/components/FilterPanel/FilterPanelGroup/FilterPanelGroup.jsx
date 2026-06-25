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
import { FilterPanelLabel } from '../FilterPanelLabel';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--filter-panel-group`;
const componentName = 'FilterPanelGroup';

/**
 * A container with a label and optional count.
 * @deprecated This component is deprecated
 */
export let FilterPanelGroup = React.forwardRef(
  ({ children, className, count, labelText, title, ...rest }, ref) => {
    return (
      <div
        {...rest}
        className={cx(blockClass, className)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {labelText && (
          <h2 className={`${blockClass}__title`}>
            <FilterPanelLabel
              count={count}
              labelText={labelText}
              title={title}
            />
          </h2>
        )}
        <div className={`${blockClass}__content`}>{children}</div>
      </div>
    );
  }
);

FilterPanelGroup.deprecated = {
  level: 'warn',
  details: `This component is deprecated`,
};

// Return a placeholder if not released and not enabled by feature flag
FilterPanelGroup = pkg.checkComponentEnabled(FilterPanelGroup, componentName);

FilterPanelGroup.displayName = componentName;

FilterPanelGroup.propTypes = {
  /**
   * Provide the contents of the FilterPanelGroup.
   */
  children: PropTypes.node.isRequired,

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
