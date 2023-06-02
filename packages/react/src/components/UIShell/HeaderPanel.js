/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';

const HeaderPanel = React.forwardRef(function HeaderPanel(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    className: customClassName,
    expanded,
    addFocusListeners = true,
    onHeaderPanelFocus,
    href,
    ...other
  },
  ref
) {
  const prefix = usePrefix();
  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };
  const controlled = useRef(expanded !== undefined).current;
  const [expandedState, setExpandedState] = useState(expanded);
  const expandedProp = controlled ? expanded : expandedState;

  const className = cx(`${prefix}--header-panel`, {
    [`${prefix}--header-panel--expanded`]: expandedProp,
    [customClassName]: !!customClassName,
  });

  const eventHandlers = {};

  if (addFocusListeners) {
    eventHandlers.onFocus = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setExpandedState(true);
        if (!expanded) {
          onHeaderPanelFocus();
        }
      }
    };
    eventHandlers.onBlur = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setExpandedState(false);
        if (expanded) {
          onHeaderPanelFocus();
        }
      }
    };
    eventHandlers.onKeyDown = (event) => {
      if (match(event, keys.Escape)) {
        setExpandedState(false);
        onHeaderPanelFocus();
        if (href) {
          window.location.href = href;
        }
      }
    };
  }

  return (
    <div
      {...other}
      className={className}
      {...accessibilityLabel}
      ref={ref}
      {...eventHandlers}>
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

  /**
   * Provide the `href` to the id of the element on your package that is the
   * main content.
   */
  href: PropTypes.string,

  /**
   * An optional listener that is called a callback to collapse the HeaderPanel
   */

  onHeaderPanelFocus: PropTypes.func,
};

HeaderPanel.displayName = 'HeaderPanel';

export default HeaderPanel;
