import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/base-elements/links/links.scss');
}

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
};

const Link = ({ children, className, href, ...other }) => {
  const classNames = classnames('bx--link', className);
  return <a href={href} className={classNames} {...other}>{children}</a>;
};

Link.propTypes = propTypes;

export default Link;
