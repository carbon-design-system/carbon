import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  nested: PropTypes.bool,
};

const defaultProps = {
  nested: false,
};

const OrderedList = ({ children, className, nested, ...other }) => {
  const classNames = classnames('bx--list--ordered', className, {
    'bx--list--nested': nested,
  });
  return (
    <ol className={classNames} {...other}>
      {children}
    </ol>
  );
};

OrderedList.propTypes = propTypes;
OrderedList.defaultProps = defaultProps;

export default OrderedList;
