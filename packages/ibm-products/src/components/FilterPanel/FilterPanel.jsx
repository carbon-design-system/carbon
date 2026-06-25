/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';

// The block part of our conventional BEM class names (blockClass__E--M).
const blockClass = `${pkg.prefix}--filter-panel`;
const componentName = 'FilterPanel';

/**
 * The container for filter panel subcomponents.
 * @deprecated This component is deprecated
 */

export let FilterPanel = React.forwardRef(
  ({ children, className, title, ...rest }, ref) => {
    return (
      <section
        {...rest}
        className={cx(blockClass, className)}
        ref={ref}
        {...getDevtoolsProps(componentName)}
      >
        {title && <h1 className={`${blockClass}__title`}>{title}</h1>}
        {children}
      </section>
    );
  }
);
FilterPanel.deprecated = {
  level: 'warn',
  details: `This component is deprecated`,
};

// Return a placeholder if not released and not enabled by feature flag
FilterPanel = pkg.checkComponentEnabled(FilterPanel, componentName);

FilterPanel.displayName = componentName;

FilterPanel.propTypes = {
  /**
   * Provide the contents of the FilterPanel.
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node.
   */
  className: PropTypes.string,

  /**
   * Title text for the filter panel.
   */
  title: PropTypes.node,
};
