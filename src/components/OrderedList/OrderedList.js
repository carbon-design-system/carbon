import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

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

OrderedList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  nested: PropTypes.bool,
};

OrderedList.defaultProps = {
  nested: false,
};

export default OrderedList;
