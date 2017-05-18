import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
if (!process.env.EXCLUDE_SASS) {
  import('@console/bluemix-components/consumables/scss/base-elements/lists/lists.scss');
}

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
