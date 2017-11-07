import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const TYPES = {
  beta: 'Beta',
  community: 'Community',
  custom: 'Custom',
  dedicated: 'Dedicated',
  experimental: 'Experimental',
  ibm: 'IBM',
  local: 'Local',
  private: 'Private',
  'third-party': 'Third-Party',
};

const Tag = ({ children, className, type, ...other }) => {
  const tagClass = `bx--tag--${type}`;
  const tagClasses = classNames('bx--tag', tagClass, className);
  return (
    <span className={tagClasses} {...other}>
      {children || TYPES[type]}
    </span>
  );
};

Tag.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
};

export const types = Object.keys(TYPES);
export default Tag;
