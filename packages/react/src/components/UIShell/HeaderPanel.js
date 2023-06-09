/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';

const HeaderPanel = React.forwardRef(function HeaderPanel(
  { children, className: customClassName, expanded, ...other },
  ref
) {
  const prefix = usePrefix();

  const className = cx(`${prefix}--header-panel`, {
    [`${prefix}--header-panel--expanded`]: expanded,
    [customClassName]: !!customClassName,
  });

  return (
    <div {...other} className={className} ref={ref}>
      {children}
    </div>
  );
});

HeaderPanel.propTypes = {
  /**
   * The content that will render inside of the `HeaderPanel`
   */
  children: PropTypes.node,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * Specify whether the panel is expanded
   */
  expanded: PropTypes.bool,
};

HeaderPanel.displayName = 'HeaderPanel';

export default HeaderPanel;
