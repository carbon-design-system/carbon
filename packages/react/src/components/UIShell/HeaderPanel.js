/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { useWindowEvent } from '../../internal/useEvent';
import { useMergedRefs } from '../../internal/useMergedRefs';

const HeaderPanel = React.forwardRef(function HeaderPanel(
  {
    children,
    className: customClassName,
    expanded,
    addFocusListeners = true,
    onHeaderPanelFocus,
    ...other
  },
  ref
) {
  const prefix = usePrefix();
  const headerPanelReference = useRef(null);
  const headerPanelRef = useMergedRefs([headerPanelReference, ref]);

  const controlled = useRef(expanded !== undefined).current;
  const [expandedState, setExpandedState] = useState(expanded);
  const expandedProp = controlled ? expanded : expandedState;

  const className = cx(`${prefix}--header-panel`, {
    [`${prefix}--header-panel--expanded`]: expandedProp,
    [customClassName]: !!customClassName,
  });

  const eventHandlers = {};

  if (addFocusListeners) {
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
      }
    };
  }

  useWindowEvent('click', () => {
    const focusedElement = document.activeElement;
    if (
      children.type.__docgenInfo.displayName === 'Switcher' &&
      !focusedElement?.closest(`.${prefix}--header-panel--expanded`) &&
      !focusedElement?.closest(`.${prefix}--header__action`) &&
      !headerPanelRef?.current?.classList.contains(`${prefix}--switcher`) &&
      expanded
    ) {
      setExpandedState(false);
      onHeaderPanelFocus();
    }
  });

  return (
    <div
      {...other}
      className={className}
      ref={headerPanelRef}
      {...eventHandlers}>
      {children}
    </div>
  );
});

HeaderPanel.propTypes = {
  /**
   * Specify whether focus and blur listeners are added. They are by default.
   */
  addFocusListeners: PropTypes.bool,

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

  /**
   * An optional listener that is called a callback to collapse the HeaderPanel
   */

  onHeaderPanelFocus: PropTypes.func,
};

HeaderPanel.displayName = 'HeaderPanel';

export default HeaderPanel;
