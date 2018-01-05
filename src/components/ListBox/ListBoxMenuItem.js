import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * `ListBoxMenuItem` is a helper component for managing the container class
 * name, alongside any classes for any corresponding states, for a generic list
 * box menu item.
 */
const ListBoxMenuItem = ({ children, isActive, isHighlighted, ...rest }) => {
  const className = cx({
    'bx--list-box__menu-item': true,
    'bx--list-box__menu-item--active': isActive,
    'bx--list-box__menu-item--highlighted': isHighlighted,
  });
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
};

ListBoxMenuItem.propTypes = {
  /**
   * Specify any children nodes that hsould be rendered inside of the ListBox
   * Menu Item
   */
  children: PropTypes.node,

  /**
   * Specify whether the current menu item is "active".
   */
  isActive: PropTypes.bool.isRequired,

  /**
   * Specify whether the current menu item is "highlighed".
   */
  isHighlighted: PropTypes.bool.isRequired,
};

ListBoxMenuItem.defaultProps = {
  isActive: false,
  isHighlighted: false,
};

export default ListBoxMenuItem;
