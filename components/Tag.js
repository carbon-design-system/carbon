import React, { PropTypes } from 'react';
import classNames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/components/tags/tags.scss';

const TYPES = {
  beta: 'Beta',
  community: 'Community',
  custom: 'Custom',
  dedicated: 'Dedicated',
  deprecated: 'Deprecated',
  experimental: 'Experimental',
  ibm: 'IBM',
  local: 'Local',
  private: 'Private',
  'third-party': 'Third-Party',
};

const propTypes = {
  children: React.PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(TYPES)).isRequired,
};

const Tag = ({ children, className, type, ...other }) => {
  const tagClass = `tag--${type}`;
  const tagClasses = classNames(
    tagClass,
    className,
  );
  return <span className={tagClasses} {...other}>{children || TYPES[type]}</span>;
};

Tag.propTypes = propTypes;

export const types = Object.keys(TYPES);
export default Tag;
