/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useRef } from 'react';
import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { AriaLabelPropType } from '../../prop-types/AriaPropTypes';
// TO-DO: comment back in when footer is added for rails
// import SideNavFooter from './SideNavFooter';

const { prefix } = settings;

const SideNav = React.forwardRef(function SideNav(props, ref) {
  const {
    expanded: expandedProp,
    defaultExpanded,
    isChildOfHeader,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    children,
    onToggle,
    className: customClassName,
    // TO-DO: comment back in when footer is added for rails
    // translateById: t,
    isFixedNav,
    isRail,
    isPersistent,
    addMouseListeners,
  } = props;

  const { current: controlled } = useRef(expandedProp !== undefined);
  const [expandedState, setExpandedState] = useState(defaultExpanded);
  const [expandedViaHoverState, setExpandedViaHoverState] = useState(
    defaultExpanded
  );
  const expanded = controlled ? expandedProp : expandedState;
  const handleToggle = (event, value = !expanded) => {
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

  const className = cx({
    [`${prefix}--side-nav`]: true,
    [`${prefix}--side-nav--expanded`]: expanded || expandedViaHoverState,
    [`${prefix}--side-nav--collapsed`]: !expanded && isFixedNav,
    [`${prefix}--side-nav--rail`]: isRail,
    [customClassName]: !!customClassName,
    [`${prefix}--side-nav--ux`]: isChildOfHeader,
    [`${prefix}--side-nav--hidden`]: !isPersistent,
  });

  const overlayClassName = cx({
    [`${prefix}--side-nav__overlay`]: true,
    [`${prefix}--side-nav__overlay-active`]: expanded,
  });

  let childrenToRender = children;

  // if a rail, pass the expansion state as a prop, so children can update themselves to match
  if (isRail) {
    childrenToRender = React.Children.map(children, child => {
      // if we are controlled, check for if we have hovered over or the expanded state, else just use the expanded state (uncontrolled)
      let currentExpansionState = controlled
        ? expandedViaHoverState || expanded
        : expanded;
      return React.cloneElement(child, {
        isSideNavExpanded: currentExpansionState,
      });
    });
  }

  const eventHanders = {
    onFocus: event => handleToggle(event, true),
    onBlur: event => handleToggle(event, false),
  };

  if (addMouseListeners) {
    eventHanders.onMouseEnter = () => handleToggle(true, true);
    eventHanders.onMouseLeave = () => handleToggle(false, false);
  }

  return (
    <>
      {isFixedNav ? null : <div className={overlayClassName} />}
      <nav
        ref={ref}
        className={`${prefix}--side-nav__navigation ${className}`}
        {...accessibilityLabel}
        {...eventHanders}>
        {childrenToRender}
      </nav>
    </>
  );
});

SideNav.defaultProps = {
  translateById: id => {
    const translations = {
      'carbon.sidenav.state.open': 'Close',
      'carbon.sidenav.state.closed': 'Open',
    };
    return translations[id];
  },
  defaultExpanded: false,
  isChildOfHeader: true,
  isFixedNav: false,
  isPersistent: true,
  addMouseListeners: true,
};

SideNav.propTypes = {
  /**
   * If `true`, the SideNav will be expanded, otherwise it will be collapsed.
   * Using this prop causes SideNav to become a controled component.
   */
  expanded: PropTypes.bool,

  /**
   * If `true`, the SideNav will be open on initial render.
   */
  defaultExpanded: PropTypes.bool,

  /**
   * An optional listener that is called when an event that would cause
   * toggling the SideNav occurs.
   *
   * @param {object} event
   * @param {boolean} value
   */
  onToggle: PropTypes.func,

  /**
   * Required props for accessibility label on the underlying menu
   */
  ...AriaLabelPropType,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Provide a custom function for translating all message ids within this
   * component. This function will take in two arguments: the mesasge Id and the
   * state of the component. From this, you should return a string representing
   * the label you want displayed or read by screen readers.
   */
  translateById: PropTypes.func,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  isChildOfHeader: PropTypes.bool,

  /**
   * Optional prop to display the side nav rail.
   */
  isRail: PropTypes.bool,

  /**
   * Specify if sideNav is standalone
   */
  isFixedNav: PropTypes.bool,

  /**
   * Specify if the sideNav will be persistent above the lg breakpoint
   */
  isPersistent: PropTypes.bool,

  /**
   * Specify whether mouse entry/exit listeners are added. They are by default.
   */
  addMouseListeners: PropTypes.bool,
};

export default SideNav;
