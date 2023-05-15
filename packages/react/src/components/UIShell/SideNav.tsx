/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {
  useState,
  useRef,
  type ForwardedRef,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEventHandler,
  isValidElement,
} from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
import { CARBON_SIDENAV_ITEMS } from './_utils';
import { usePrefix } from '../../internal/usePrefix';
import { keys, match } from '../../internal/keyboard';
// TO-DO: comment back in when footer is added for rails
// import SideNavFooter from './SideNavFooter';

interface SideNavProps extends ComponentProps<'nav'> {
  expanded?: boolean | undefined;
  defaultExpanded?: boolean | undefined;
  isChildOfHeader?: boolean | undefined;
  onToggle?: (
    event: FocusEvent<HTMLElement> | KeyboardEvent<HTMLElement> | boolean,
    value: boolean
  ) => void | undefined;
  href?: string | undefined;
  // TO-DO: comment back in when footer is added for rails
  // translateById?: ((id: TranslationId) => Translation) | undefined;
  isFixedNav?: boolean | undefined;
  isRail?: boolean | undefined;
  isPersistent?: boolean | undefined;
  addFocusListeners?: boolean | undefined;
  addMouseListeners?: boolean | undefined;
  onOverlayClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

function SideNavRenderFunction(
  {
    expanded: expandedProp,
    defaultExpanded = false,
    isChildOfHeader = true,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    onToggle,
    className: customClassName,
    // TO-DO: comment back in when footer is added for rails
    // translateById: t = (id) => translations[id],
    href,
    isFixedNav = false,
    isRail,
    isPersistent = true,
    addFocusListeners = true,
    addMouseListeners = true,
    onOverlayClick,
    ...other
  }: SideNavProps,
  ref: ForwardedRef<HTMLElement>
) {
  const prefix = usePrefix();
  const { current: controlled } = useRef(expandedProp !== undefined);
  const [expandedState, setExpandedState] = useState(defaultExpanded);
  const [expandedViaHoverState, setExpandedViaHoverState] =
    useState(defaultExpanded);
  const expanded = controlled ? expandedProp : expandedState;

  const handleToggle: typeof onToggle = (event, value = !expanded) => {
    if (!controlled) {
      setExpandedState(value);
    }
    if (onToggle) {
      onToggle(event, value);
    }
    if (controlled || isRail) {
      setExpandedViaHoverState(value);
    }
  };

  const accessibilityLabel = {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
  };

  // TO-DO: comment back in when footer is added for rails
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

  let childrenToRender = children;

  // if a rail, pass the expansion state as a prop, so children can update themselves to match
  if (isRail) {
    childrenToRender = React.Children.map(children, (child) => {
      // if we are controlled, check for if we have hovered over or the expanded state, else just use the expanded state (uncontrolled)
      const currentExpansionState = controlled
        ? expandedViaHoverState || expanded
        : expanded;
      if (isValidElement(child)) {
        const childJsxElement = child as JSX.Element;
        // avoid spreading `isSideNavExpanded` to non-Carbon UI Shell children
        return React.cloneElement(childJsxElement, {
          ...(CARBON_SIDENAV_ITEMS.includes(
            childJsxElement.type?.displayName ?? childJsxElement.type?.name
          )
            ? {
                isSideNavExpanded: currentExpansionState,
              }
            : {}),
        });
      }
      return child;
    });
  }

  const eventHandlers: Partial<
    Pick<
      ComponentProps<'nav'>,
      'onFocus' | 'onBlur' | 'onKeyDown' | 'onMouseEnter' | 'onMouseLeave'
    >
  > = {};

  if (addFocusListeners) {
    eventHandlers.onFocus = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleToggle(event, true);
      }
    };
    eventHandlers.onBlur = (event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        handleToggle(event, false);
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
    eventHandlers.onMouseEnter = () => handleToggle(true, true);
    eventHandlers.onMouseLeave = () => handleToggle(false, false);
  }

  return (
    <>
      {isFixedNav ? null : (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div className={overlayClassName} onClick={onOverlayClick} />
      )}
      <nav
        ref={ref}
        className={`${prefix}--side-nav__navigation ${className}`}
        {...accessibilityLabel}
        {...eventHandlers}
        {...other}>
        {childrenToRender}
      </nav>
    </>
  );
}

const SideNav = React.forwardRef(SideNavRenderFunction);

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
   * If `true`, the SideNav will be expanded, otherwise it will be collapsed.
   * Using this prop causes SideNav to become a controled component.
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
   * An optional listener that is called when an event that would cause
   * toggling the SideNav occurs.
   *
   * @param {object} event
   * @param {boolean} value
   */
  onToggle: PropTypes.func,

  /**
   * Provide a custom function for translating all message ids within this
   * component. This function will take in two arguments: the mesasge Id and the
   * state of the component. From this, you should return a string representing
   * the label you want displayed or read by screen readers.
   */
  // translateById: PropTypes.func,
};

export default SideNav;
