import { settings } from 'carbon-components';
import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const { prefix } = settings;

const SideNavItems = ({ className: customClassName, children }) => {
  const className = cx([`${prefix}--side-nav__items`], customClassName);
  return <ul className={className}>{children}</ul>;
};

SideNavItems.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container
   */
  children: PropTypes.node.isRequired,
};

export default SideNavItems;
