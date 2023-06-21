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
    href,
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

  const [lastClickedElement, setLastClickedElement] = useState(null);

  const className = cx(`${prefix}--header-panel`, {
    [`${prefix}--header-panel--expanded`]: expandedProp,
    [customClassName]: !!customClassName,
  });

  const eventHandlers = {};

  if (addFocusListeners) {
    eventHandlers.onBlur = (event) => {
      if (
        !event.currentTarget.contains(event.relatedTarget) &&
        !lastClickedElement.classList.contains('cds--switcher__item-link')
      ) {
        setExpandedState(false);
        setLastClickedElement(null);
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

  useWindowEvent('click', () => {
    const focusedElement = document.activeElement;
    setLastClickedElement(focusedElement);

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
   * Provide the `href` to the id of the element on your package that could
   * be target.
   */
  href: PropTypes.string,

  /**
   * An optional listener that is called a callback to collapse the HeaderPanel
   */

  onHeaderPanelFocus: PropTypes.func,
};

HeaderPanel.displayName = 'HeaderPanel';

export default HeaderPanel;
