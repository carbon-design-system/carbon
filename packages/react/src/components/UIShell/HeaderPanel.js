/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';

const HeaderPanel = React.forwardRef(function HeaderPanel(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    className: customClassName,
    expanded,
    addFocusListeners = true,
    ...other
  },
  ref
) {
  const prefix = usePrefix();
  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };
  const [expandedState, setExpandedState] = useState(expanded);

  const className = cx(`${prefix}--header-panel`, {
    [`${prefix}--header-panel--expanded`]: expandedState,
    [customClassName]: !!customClassName,
  });

  const eventHandlers = {};

  if (addFocusListeners) {
    eventHandlers.onFocus = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setExpandedState(true);
      }
    };
    eventHandlers.onBlur = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setExpandedState(false);
      }
    };
  }

  return (
    <div
      {...other}
      {...eventHandlers}
      className={className}
      {...accessibilityLabel}
      ref={ref}>
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
   * Specify whether focus and blur listeners are added. They are by default.
   */
  addFocusListeners: PropTypes.bool,

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
