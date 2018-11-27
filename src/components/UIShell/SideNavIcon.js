import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

const { prefix } = settings;

const SideNavIcon = ({ children, className: customClassName, small }) => {
  const className = cx({
    [`${prefix}--side-nav__icon`]: true,
    [`${prefix}--side-nav__icon--small`]: small,
    [customClassName]: !!customClassName,
  });
  return <div className={className}>{children}</div>;
};

SideNavIcon.propTypes = {
  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,

  /**
   * Provide a single icon as the child to `SideNavIcon` to render in the
   * container
   */
  children: PropTypes.node.isRequired,

  /**
   * Specify whether the icon should be placed in a smaller bounding box
   */
  small: PropTypes.bool.isRequired,
};

SideNavIcon.defaultProps = {
  small: false,
};

export default SideNavIcon;
