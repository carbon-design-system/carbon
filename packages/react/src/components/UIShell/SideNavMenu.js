/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import SideNavIcon from './SideNavIcon';
import { keys, match } from '../../internal/keyboard';
import { usePrefix } from '../../internal/usePrefix';

const SideNavMenu = React.forwardRef(function SideNavMenu(props, ref) {
  const {
    className: customClassName,
    children,
    defaultExpanded = false,
    isActive = false,
    large = false,
    renderIcon: IconElement,
    isSideNavExpanded,
    title,
  } = props;
  const prefix = usePrefix();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [prevExpanded, setPrevExpanded] = useState(defaultExpanded);
  const className = cx({
    [`${prefix}--side-nav__item`]: true,
    [`${prefix}--side-nav__item--active`]:
      isActive || (hasActiveChild(children) && !isExpanded),
    [`${prefix}--side-nav__item--icon`]: IconElement,
    [`${prefix}--side-nav__item--large`]: large,
    [customClassName]: !!customClassName,
  });

  if (isSideNavExpanded === false && isExpanded === true) {
    setIsExpanded(false);
    setPrevExpanded(true);
  } else if (isSideNavExpanded === true && prevExpanded === true) {
    setIsExpanded(true);
    setPrevExpanded(false);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      className={className}
      onKeyDown={(event) => {
        if (match(event, keys.Escape)) {
          setIsExpanded(false);
        }
      }}>
      <button
        aria-expanded={isExpanded}
        className={`${prefix}--side-nav__submenu`}
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        ref={ref}
        type="button">
        {IconElement && (
          <SideNavIcon>
            <IconElement />
          </SideNavIcon>
        )}
        <span className={`${prefix}--side-nav__submenu-title`} title={title}>
          {title}
        </span>
        <SideNavIcon className={`${prefix}--side-nav__submenu-chevron`} small>
          <ChevronDown size={20} />
        </SideNavIcon>
      </button>
      <ul className={`${prefix}--side-nav__menu`}>{children}</ul>
    </li>
  );
});

SideNavMenu.propTypes = {
  /**
   * Provide <SideNavMenuItem>'s inside of the `SideNavMenu`
   */
  children: PropTypes.node,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Specify whether the menu should default to expanded. By default, it will
   * be closed.
   */
  defaultExpanded: PropTypes.bool,

  /**
   * Specify whether the `SideNavMenu` is "active". `SideNavMenu` should be
   * considered active if one of its menu items are a link for the current
   * page.
   */
  isActive: PropTypes.bool,

  /**
   * Property to indicate if the side nav container is open (or not). Use to
   * keep local state and styling in step with the SideNav expansion state.
   */
  isSideNavExpanded: PropTypes.bool,

  /**
   * Specify if this is a large variation of the SideNavMenu
   */
  large: PropTypes.bool,

  /**
   * Pass in a custom icon to render next to the `SideNavMenu` title
   */
  renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

  /**
   * Provide the text for the overall menu name
   */
  title: PropTypes.string.isRequired,
};

function hasActiveChild(children) {
  // if we have children, either a single or multiple, find if it is active
  if (Array.isArray(children)) {
    return children.some((child) => {
      if (!child.props) {
        return false;
      }

      if (child.props.isActive === true) {
        return true;
      }

      if (child.props['aria-current']) {
        return true;
      }

      return false;
    });
  }

  if (children.props) {
    if (children.props.isActive === true || children.props['aria-current']) {
      return true;
    }
  }

  return false;
}

export { SideNavMenu };
