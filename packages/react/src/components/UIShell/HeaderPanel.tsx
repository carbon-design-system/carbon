/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useRef,
  useState,
  ReactNode,
  type ComponentProps,
  type ForwardedRef,
} from 'react';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { useWindowEvent } from '../../internal/useEvent';
import { useMergedRefs } from '../../internal/useMergedRefs';

interface HeaderPanelProps {
  /**
   * Specify whether focus and blur listeners are added. They are by default.
   */
  addFocusListeners?: boolean;

  /**
   * The content that will render inside of the `HeaderPanel`
   */
  children?: ReactNode;

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className?: string;

  /**
   * Specify whether the panel is expanded
   */
  expanded?: boolean;

  /**
   * Provide the `href` to the id of the element on your package that could
   * be target.
   */
  href?: string;

  /**
   * An optional listener that is called a callback to collapse the HeaderPanel
   */
  onHeaderPanelFocus?: () => void;
}

const noopFn = () => {};
const HeaderPanel: React.FC<HeaderPanelProps> = React.forwardRef(
  function HeaderPanel(
    {
      children,
      className: customClassName,
      expanded,
      addFocusListeners = true,
      onHeaderPanelFocus = noopFn,
      href,
      ...rest
    },
    ref: ForwardedRef<HTMLDivElement>
  ) {
    const prefix = usePrefix();
    const headerPanelReference = useRef<HTMLDivElement>(null);
    const headerPanelRef = useMergedRefs([headerPanelReference, ref]);

    const controlled = useRef(expanded !== undefined).current;
    const [expandedState, setExpandedState] = useState(expanded);
    const expandedProp = controlled ? expanded : expandedState;

    const [lastClickedElement, setLastClickedElement] =
      useState<HTMLElement | null>(null);

    const className = cx(`${prefix}--header-panel`, {
      [`${prefix}--header-panel--expanded`]: expandedProp,
      [customClassName as string]: !!customClassName,
    });

    const eventHandlers: Partial<
      Pick<ComponentProps<'header'>, 'onBlur' | 'onKeyDown'>
    > = {};

    if (addFocusListeners) {
      eventHandlers.onBlur = (event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !lastClickedElement?.classList?.contains('cds--switcher__item-link')
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
      const focusedElement = document.activeElement as HTMLElement;
      setLastClickedElement(focusedElement);

      const childJsxElement = children as JSX.Element;

      if (
        childJsxElement.type?.displayName === 'Switcher' &&
        !focusedElement?.closest(`.${prefix}--header-panel--expanded`) &&
        !focusedElement?.closest(`.${prefix}--header__action`) &&
        !headerPanelReference?.current?.classList.contains(
          `${prefix}--switcher`
        ) &&
        expanded
      ) {
        setExpandedState(false);
        onHeaderPanelFocus();
      }
    });

    return (
      <div
        {...rest}
        className={className}
        ref={headerPanelRef}
        {...eventHandlers}>
        {children}
      </div>
    );
  }
);

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
