/**
 * Copyright IBM Corp. 2024, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import NavList, { blockClass as navListBlockClass } from './NavList';
import NavItem, { blockClass as navItemBlockClass } from './NavItem';

import { getDevtoolsProps } from '../../global/js/utils/devtools';
import { pkg } from '../../settings';
const componentName = 'Nav';
const blockClass = `${pkg.prefix}--nav`;

/**
 * @deprecated This component is deprecated
 */
export let Nav = React.forwardRef(
  ({ activeHref, className, children, heading, label, ...rest }, ref) => {
    const [_activeHref, setActiveHref] = useState(activeHref);
    const navigationLists = useRef({});

    useEffect(() => {
      if (!_activeHref && window.location) {
        const { hash, pathname } = window.location;
        setActiveHref(pathname + hash);
      }
    }, [_activeHref]);

    /**
     * Creates a new child list item.
     * @param {NavItem} child The child list item to create.
     * @param {number} index The index of the child list item.
     * @returns {NavItem} The new child list item.
     */
    const buildNewItemChild = (child, index) => {
      const key = `${navItemBlockClass}--${index}`;

      return (
        <NavItem
          {...child.props}
          activeHref={_activeHref}
          key={key}
          onClick={(event, href) =>
            handleItemClick(event, href, child.props.onClick)
          }
        />
      );
    };

    /**
     * Creates a new child list.
     * @param {NavList} child The child list to create.
     * @param {number} index The index of the child list.
     * @returns {NavList} The new child list.
     */
    const buildNewListChild = (child, index) => {
      const key = `${navListBlockClass}--${index}`;

      return (
        <NavList
          {...child.props}
          activeHref={_activeHref}
          id={key}
          key={key}
          onListClick={handleListClick}
          onItemClick={handleItemClick}
          ref={(el) => (navigationLists.current[key] = el)}
        />
      );
    };

    /**
     * Handles toggling the list item.
     * @param {SyntheticEvent} event The event fired when the list item is toggled.
     * @param {string} href The URL of the list item.
     */
    const handleItemClick = (event, href, onClick) => {
      event.stopPropagation();

      const { type, which } = event;

      // Enter (13) and spacebar (32).
      const acceptableEvent = which === 13 || which === 32 || type === 'click';

      const diffHref = href !== _activeHref;
      if (acceptableEvent && diffHref) {
        setActiveHref(href);
      }

      if (onClick) {
        onClick(event);
      }
    };

    /**
     * Handles when a list has been selected.
     * @param {number} id The index of the list.
     */
    const handleListClick = (id) => {
      Object.keys(navigationLists.current).forEach((key) => {
        if (key !== id && !navigationLists.current[key].isExpandedOnPageLoad) {
          navigationLists.current[key].close();
        }
      });
    };

    return (
      <nav
        className={cx(blockClass, className)}
        aria-label={label}
        ref={ref}
        {...getDevtoolsProps(componentName)}
        {...rest}
      >
        {heading && <h1 className={`${blockClass}__heading`}>{heading}</h1>}

        <ul className={`${blockClass}__wrapper`} role="menubar">
          {React.Children.map(children, (child, index) => {
            return child?.type?.displayName === NavList.displayName
              ? buildNewListChild(child, index)
              : buildNewItemChild(child, index);
          })}
        </ul>
      </nav>
    );
  }
);

Nav.deprecated = {
  level: 'warn',
  details: `This component is deprecated`,
};

Nav.propTypes = {
  /**
   * Hypertext reference for active page.
   */
  activeHref: PropTypes.string,

  /**
   * Child elements.
   */
  children: PropTypes.node,

  /**
   * Extra classes to add.
   */
  className: PropTypes.string,

  /**
   * Heading.
   */
  heading: PropTypes.string,

  /**
   * Aria-label on the rendered `nav` element.
   */
  label: PropTypes.string.isRequired,
};

// Return a placeholder if not released and not enabled by feature flag
Nav = pkg.checkComponentEnabled(Nav, componentName);

// The display name of the component, used by React. Note that displayName
// is used in preference to relying on function.name.
Nav.displayName = componentName;

export default Nav;
