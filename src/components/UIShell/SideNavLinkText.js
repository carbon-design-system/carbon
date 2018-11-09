import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

const SideNavLinkText = ({ className: customClassName, children, ...rest }) => {
  const className = cx('bx--side-nav__link-text', customClassName);
  return (
    <span {...rest} className={className}>
      {children}
    </span>
  );
};

SideNavLinkText.propTypes = {
  /**
   * Provide the content for the link text
   */
  children: PropTypes.node.isRequired,

  /**
   * Provide an optional class to be applied to the containing node
   */
  className: PropTypes.string,
};

export default SideNavLinkText;
