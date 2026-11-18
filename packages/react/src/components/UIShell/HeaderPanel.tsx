/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, {
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react';
import { isComponentElement } from '../../internal';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { useWindowEvent } from '../../internal/useEvent';
import { useMergedRefs } from '../../internal/useMergedRefs';
import Switcher from './Switcher';
import { noopFn } from '../../internal/noopFn';

export interface HeaderPanelProps {
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

const HeaderPanel = React.forwardRef<HTMLDivElement, HeaderPanelProps>(
  (
    {
      children,
      className: customClassName,
      expanded,
      addFocusListeners = true,
      onHeaderPanelFocus = noopFn,
      href,
      ...rest
    },
    ref
  ) => {
    const prefix = usePrefix();
    const headerPanelReference = useRef<HTMLDivElement>(null);
    const headerPanelRef = useMergedRefs([headerPanelReference, ref]);

    const controlled = useRef(expanded !== undefined).current;
    const [expandedState, setExpandedState] = useState(expanded);
    const expandedProp = controlled ? expanded : expandedState;

    const [lastClickedElement, setLastClickedElement] =
      useState<Element | null>(null);

    const className = cx(`${prefix}--header-panel`, {
      [`${prefix}--header-panel--expanded`]: expandedProp,
      [customClassName as string]: !!customClassName,
    });

    const isChildASwitcher = isComponentElement(children, Switcher);
    const isHeaderAction = (target: EventTarget | null) =>
      target instanceof Element &&
      !!target.closest(`.${prefix}--header__action`) &&
      !!headerPanelReference.current
        ?.closest(`.${prefix}--header`)
        ?.contains(target);

    const eventHandlers: Partial<
      Pick<ComponentProps<'header'>, 'onBlur' | 'onKeyDown'>
    > = {};

    // Whether `element` is, or is inside, the header action that toggles this
    // panel. Its own click handler toggles the panel, so closing it on blur as
    // well would make it re-open.
    const isPanelToggle = (element: Element | null) => {
      if (!element || !href?.startsWith('#') || href.length === 1) {
        return false;
      }
      const toggle = element.ownerDocument.getElementById(href.slice(1));
      return !!toggle?.contains(element);
    };

    // Safari doesn't focus a button when it's clicked, so `relatedTarget` is
    // null when the toggle is clicked. Remember what the mouse was pressed
    // on so `onBlur` can still tell the toggle is being clicked.
    const mouseDownTarget = useRef<Element>(null);
    useWindowEvent('mousedown', (event) => {
      mouseDownTarget.current =
        event.target instanceof Element ? event.target : null;
    });

    const isPanelToggleOrKeyboardAction = (relatedTarget: EventTarget | null) =>
      isPanelToggle(
        relatedTarget instanceof Element
          ? relatedTarget
          : mouseDownTarget.current
      ) ||
      (isChildASwitcher &&
        !mouseDownTarget.current &&
        isHeaderAction(relatedTarget));

    if (addFocusListeners) {
      eventHandlers.onBlur = (event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !isPanelToggleOrKeyboardAction(event.relatedTarget) &&
          !lastClickedElement?.classList?.contains(
            `${prefix}--switcher__item-link`
          )
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

    useWindowEvent('focusout', (event: FocusEvent) => {
      if (
        addFocusListeners &&
        isChildASwitcher &&
        expandedProp &&
        isHeaderAction(event.target) &&
        !isPanelToggleOrKeyboardAction(event.relatedTarget) &&
        !(
          event.relatedTarget instanceof Node &&
          headerPanelReference.current?.contains(event.relatedTarget)
        )
      ) {
        setExpandedState(false);
        setLastClickedElement(null);
        if (expanded) {
          onHeaderPanelFocus();
        }
      }
    });

    useWindowEvent('click', (event: MouseEvent) => {
      const { target } = event;
      mouseDownTarget.current = null;
      if (!(target instanceof Element)) return;
      setLastClickedElement(target);

      if (
        isChildASwitcher &&
        !target.closest(`.${prefix}--header-panel--expanded`) &&
        !target.closest(`.${prefix}--header__action`) &&
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
