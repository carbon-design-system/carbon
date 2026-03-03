/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  forwardRef,
  useEffect,
  useRef,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEventHandler,
} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
import { useMergedRefs } from '../../internal/useMergedRefs';
import { useWindowEvent } from '../../internal/useEvent';
import { useDelayedState } from '../../internal/useDelayedState';
import { SideNavContextProvider } from './SideNavContext';
import { breakpoints } from '@carbon/layout';
import { useMatchMedia } from '../../internal/useMatchMedia';
// TODO: comment back in when footer is added for rails
// import SideNavFooter from './SideNavFooter';

export interface SideNavProps {
  expanded?: boolean | undefined;
  defaultExpanded?: boolean | undefined;
  isChildOfHeader?: boolean | undefined;
  onToggle?: (
    event: FocusEvent<HTMLElement> | KeyboardEvent<HTMLElement> | boolean,
    value: boolean
  ) => void;
  href?: string | undefined;
  // TODO: comment back in when footer is added for rails
  // translateById?: ((id: TranslationId) => Translation) | undefined;
  isFixedNav?: boolean | undefined;
  isRail?: boolean | undefined;
  isPersistent?: boolean | undefined;
  addFocusListeners?: boolean | undefined;
  addMouseListeners?: boolean | undefined;
  onOverlayClick?: MouseEventHandler<HTMLDivElement> | undefined;
  onSideNavBlur?: () => void;
  enterDelayMs?: number;
}

const frFn = forwardRef<HTMLElement, SideNavProps & ComponentProps<'nav'>>;

const SideNav = frFn((props, ref) => {
  const {
    expanded: expandedProp,
    defaultExpanded = false,
    isChildOfHeader = true,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    onToggle,
    className: customClassName,
    // TODO: comment back in when footer is added for rails
    // translateById: t = (id) => translations[id],
    href,
    isFixedNav = false,
    isRail,
    isPersistent = true,
    addFocusListeners = true,
    addMouseListeners = true,
    onOverlayClick,
    onSideNavBlur,
    enterDelayMs = 100,
    ...other
  } = props;

  const prefix = usePrefix();
  const { current: controlled } = useRef(expandedProp !== undefined);
  const [expandedState, setExpandedState] = useDelayedState(defaultExpanded);
  const [expandedViaHoverState, setExpandedViaHoverState] =
    useDelayedState(defaultExpanded);
  const expanded = controlled ? expandedProp : expandedState;
  const sideNavRef = useRef<HTMLElement>(null);
  const navRef = useMergedRefs([sideNavRef, ref]);

  const handleToggle: typeof onToggle = (event, value = !expanded) => {
    if (!controlled) {
      setExpandedState(value, enterDelayMs);
    }
    if (onToggle) {
      onToggle(event, value);
    }
    if (controlled || isRail) {
      setExpandedViaHoverState(value, enterDelayMs);
    }
  };

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  // TODO: comment back in when footer is added for rails
  // const assistiveText = expanded
  //   ? t('carbon.sidenav.state.open')
  //   : t('carbon.sidenav.state.closed');

  const className = cx(customClassName, {
    [`${prefix}--side-nav`]: true,
    [`${prefix}--side-nav--expanded`]: expanded || expandedViaHoverState,
    [`${prefix}--side-nav--collapsed`]: !expanded && isFixedNav,
    [`${prefix}--side-nav--rail`]: isRail,
    [`${prefix}--side-nav--ux`]: isChildOfHeader,
    [`${prefix}--side-nav--hidden`]: !isPersistent,
  });

  const overlayClassName = cx({
    [`${prefix}--side-nav__overlay`]: true,
    [`${prefix}--side-nav__overlay-active`]: expanded || expandedViaHoverState,
  });

  // In controlled mode, rail hover can temporarily expand SideNav.
  const currentExpansionState = controlled
    ? expandedViaHoverState || expanded
    : expanded;

  const eventHandlers: Partial<
    Pick<
      ComponentProps<'nav'>,
      | 'onFocus'
      | 'onBlur'
      | 'onKeyDown'
      | 'onMouseEnter'
      | 'onMouseLeave'
      | 'onClick'
    >
  > = {};

  if (addFocusListeners) {
    eventHandlers.onFocus = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget) && isRail) {
        handleToggle(event, true);
      }
    };
    eventHandlers.onBlur = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleToggle(event, false);
      }
      if (
        !event.currentTarget.contains(event.relatedTarget) &&
        expanded &&
        !isFixedNav
      ) {
        if (onSideNavBlur) {
          onSideNavBlur();
        }
      }
    };
    eventHandlers.onKeyDown = (event) => {
      if (match(event, keys.Escape)) {
        handleToggle(event, false);
        if (href) {
          window.location.href = href;
        }
      }
    };
  }

  if (addMouseListeners && isRail) {
    eventHandlers.onMouseEnter = () => {
      handleToggle(true, true);
    };
    eventHandlers.onMouseLeave = () => {
      setExpandedState(false);
      setExpandedViaHoverState(false);
      handleToggle(false, false);
    };
    eventHandlers.onClick = () => {
      //if delay is enabled, and user intentionally clicks it to see it expanded immediately
      setExpandedState(true);
      setExpandedViaHoverState(true);
      handleToggle(true, true);
    };
  }

  useWindowEvent('keydown', (event) => {
    const focusedElement = document.activeElement;

    if (
      match(event, keys.Tab) &&
      expanded &&
      !isFixedNav &&
      sideNavRef.current &&
      focusedElement?.classList.contains(`${prefix}--header__menu-toggle`) &&
      !focusedElement.closest('nav')
    ) {
      sideNavRef.current.focus();
    }
  });

  const lgMediaQuery = `(min-width: ${breakpoints.lg.width})`;
  const isLg = useMatchMedia(lgMediaQuery);
  const inertEnabled = !isRail ? !(expanded || isLg) : false;

  useEffect(() => {
    const node = sideNavRef.current;

    if (!node) return;

    if (inertEnabled) {
      node.setAttribute('inert', '');
    } else {
      node.removeAttribute('inert');
    }
  }, [inertEnabled]);

  return (
    <SideNavContextProvider
      isRail={isRail}
      isSideNavExpanded={currentExpansionState}>
      {isFixedNav ? null : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={overlayClassName} onClick={onOverlayClick} />
      )}
      <nav
        tabIndex={-1}
        ref={navRef}
        className={`${prefix}--side-nav__navigation ${className}`}
        {...accessibilityLabel}
        {...eventHandlers}
        {...other}>
        {children}
      </nav>
    </SideNavContextProvider>
  );
});

SideNav.displayName = 'SideNav';

SideNav.propTypes = {
  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Specify whether focus and blur listeners are added. They are by default.
   */
  addFocusListeners: PropTypes.bool,

  /**
   * Specify whether mouse entry/exit listeners are added. They are by default.
   */
  addMouseListeners: PropTypes.bool,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  className: PropTypes.string,

  /**
   * If `true`, the SideNav will be open on initial render.
   */
  defaultExpanded: PropTypes.bool,

  /**
   * Specify the duration in milliseconds to delay before displaying the side navigation
   */
  enterDelayMs: PropTypes.number,

  /**
   * If `true`, the SideNav will be expanded, otherwise it will be collapsed.
   * Using this prop causes SideNav to become a controlled component.
   */
  expanded: PropTypes.bool,

  /**
   * Provide the `href` to the id of the element on your package that is the
   * main content.
   */
  href: PropTypes.string,

  /**
   * Optionally provide a custom class to apply to the underlying `<li>` node
   */
  isChildOfHeader: PropTypes.bool,

  /**
   * Specify if sideNav is standalone
   */
  isFixedNav: PropTypes.bool,

  /**
   * Specify if the sideNav will be persistent above the lg breakpoint
   */
  isPersistent: PropTypes.bool,

  /**
   * Optional prop to display the side nav rail.
   */
  isRail: PropTypes.bool,

  /**
   * An optional listener that is called when the SideNav overlay is clicked
   *
   * @param {object} event
   */
  onOverlayClick: PropTypes.func,

  /**
   * An optional listener that is called a callback to collapse the SideNav
   */

  onSideNavBlur: PropTypes.func,

  /**
   * An optional listener that is called when an event that would cause
   * toggling the SideNav occurs.
   *
   * @param {object} event
   * @param {boolean} value
   */
  onToggle: PropTypes.func,

  /**
   * Provide a custom function for translating all message ids within this
   * component. This function will take in two arguments: the message Id and the
   * state of the component. From this, you should return a string representing
   * the label you want displayed or read by screen readers.
   */
  // translateById: PropTypes.func,
};

export default SideNav;

export { SideNavContext } from './SideNavContext';
