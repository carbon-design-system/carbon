import React, { PropTypes } from 'react';
import classnames from 'classnames';
// eslint-disable-next-line max-len, import/no-unresolved
import '../env-defined-then-loader?-EXCLUDE_SASS!@console/bluemix-components/consumables/scss/base-elements/lists/lists.scss';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  nested: PropTypes.bool,
};

const defaultProps = {
  nested: false,
};

const UnorderedList = ({ children, className, nested, ...other }) => {
  const classNames = classnames(
    'bx--list--unordered',
    className,
    {
      'bx--list--nested': nested,
    });
  return <ul className={classNames} {...other}>{children}</ul>;
};

UnorderedList.propTypes = propTypes;
UnorderedList.defaultProps = defaultProps;

export default UnorderedList;
