import cx from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { name } from './classNames';

const HeaderName = ({
  children,
  className: customClassName,
  prefix,
  href,
  ...rest
}) => {
  const className = cx(name.name, customClassName);
  return (
    <a {...rest} className={className} href={href}>
      {prefix && <>{prefix}&nbsp;</>}
      <span className={name.platform}>{children}</span>
    </a>
  );
};

HeaderName.propTypes = {
  /**
   * Pass in children that are either a string or can be read as a string by
   * screen readers
   */
  children: PropTypes.node.isRequired,

  /**
   * Optionally provide a custom class to apply to the underlying <li> node
   */
  className: PropTypes.string,

  /**
   * Optionally specify a prefix to your header name. Useful for companies, for
   * example: IBM [Product Name] versus solely [Product Name]
   */
  prefix: PropTypes.string,

  /**
   * Provide an href for the name to link to
   */
  href: PropTypes.string.isRequired,
};

HeaderName.defaultProps = {
  prefix: 'IBM',
};

export default HeaderName;
