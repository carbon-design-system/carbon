/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useImperativeHandle } from 'react';
import { ChevronDown } from '@carbon/icons-react';
import cx from 'classnames';
import { bool, func, node, number, string } from 'prop-types';
import NavItem, { blockClass as navItemBlockClass } from './NavItem';
import { pkg } from '../../settings';

const componentName = 'NavList';
export const blockClass = `${pkg.prefix}--nav-list`;

// Default values for props
const defaults = {
  activeHref: '#',
  className: '',
  children: null,
  id: '',
  isExpandedOnPageLoad: false,
  onItemClick: () => {},
  onListClick: () => {},
  tabIndex: 0,
  title: '',
  icon: '',
  navigationItemTitle: '',
};

export let NavList = React.forwardRef(
  (
    {
      activeHref = defaults.activeHref,
      children = defaults.children,
      className = defaults.className,
      icon = defaults.icon,
      id = defaults.id,
      isExpandedOnPageLoad = defaults.isExpandedOnPageLoad,
      navigationItemTitle = defaults.navigationItemTitle,
      onItemClick = defaults.onItemClick,
      onListClick = defaults.onListClick,
      tabIndex = defaults.tabIndex,
      title = defaults.title,
    },
    ref
  ) => {
    const [open, setOpen] = useState(isExpandedOnPageLoad);

    useEffect(() => {
      const hrefs = React.Children.toArray(children)
        .filter(
          ({ props: childProps }) =>
            childProps.href && childProps.href.length > 0
        )
        .map(({ props: childProps }) => childProps.href);

      setOpen(hrefs.includes(activeHref) || isExpandedOnPageLoad);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Closes the list.
     */
    const close = () => {
      if (open) {
        setOpen(false);
      }
    };

    /**
     * Handles toggling the list.
     * @param {SyntheticEvent} event The event fired when the list is toggled.
     */
    const toggle = (event) => {
      const { which, type } = event;

      // Enter (13) and spacebar (32).
      if (which === 13 || which === 32 || type === 'click') {
        if (!open) {
          onListClick(id);
        }
        setOpen(!open);
      }
    };

    // Expose external function calls to the parent component
    useImperativeHandle(ref, () => ({
      close,
      isExpandedOnPageLoad,
    }));

    const newChildren = React.Children.map(children, (child, index) => (
      <NavItem
        {...child.props}
        key={`${navItemBlockClass}--${index}`}
        onClick={(event, href) => {
          onItemClick(event, href);
          child.props.onClick?.(event);
        }}
        activeHref={activeHref}
        tabIndex={open ? 0 : -1}
      />
    ));

    return (
      <li
        ref={ref}
        className={cx(blockClass, className, {
          [`${navItemBlockClass}--expanded`]: open,
        })}
        tabIndex={tabIndex}
        onClick={toggle}
        onKeyDown={toggle}
        role="menuitem"
      >
        <div className={`${navItemBlockClass}__link`}>
          {icon && (
            <img
              alt={navigationItemTitle}
              className={`${navItemBlockClass}__img`}
              src={icon}
            />
          )}
          <div className={`${navItemBlockClass}__content`}>{title}</div>
          <ChevronDown className={`${blockClass}__icon`} />
        </div>
        <ul
          aria-label={title}
          aria-hidden={!open}
          className={`${blockClass} ${blockClass}--nested`}
          role="menu"
        >
          {newChildren}
        </ul>
      </li>
    );
  }
);

NavList.propTypes = {
  /** @type {string} Hypertext reference for active page. */
  activeHref: string,

  /** @type {Node} Child elements. */
  children: node,

  /** @type {string} Extra classes to add. */
  className: string,

  /** @type {string} Icon of a list. */
  icon: string,

  /** @type {string} ID of a list. */
  id: string,

  /** @type {boolean} State of a list. */
  isExpandedOnPageLoad: bool,

  /** @type {boolean} Title of nav. */
  navigationItemTitle: string,

  /** @type {Function} Click handler for an item. */
  onItemClick: func,

  /** @type {Function} Click handler for a list. */
  onListClick: func,

  /** @type {number} `tabindex` of an item. */
  tabIndex: number,

  /** @type {string} Label of the list. */
  title: string,
};

NavList.displayName = componentName;

// Return a placeholder if not released and not enabled by feature flag
NavList = pkg.checkComponentEnabled(NavList, componentName);

export default NavList;
