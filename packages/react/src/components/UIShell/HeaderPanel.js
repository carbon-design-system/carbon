/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';

const { prefix } = settings;

const HeaderPanel = React.forwardRef(function HeaderPanel(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    className: customClassName,
    expanded,
    ...other
  },
  ref
) {
  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  const className = cx(`${prefix}--header-panel`, {
    [`${prefix}--header-panel--expanded`]: expanded,
    [customClassName]: !!customClassName,
  });

  return (
    <div {...other} className={className} {...accessibilityLabel} ref={ref}>
      {children}
    </div>
  );
});

HeaderPanel.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the panel is expanded
   */
  expanded: PropTypes.bool,
};

HeaderPanel.displayName = 'HeaderPanel';

export default HeaderPanel;
