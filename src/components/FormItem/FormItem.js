import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const FormItem = ({ className, children, ...other }) => {
  const classNames = classnames('bx--form-item', className);

  return (
    <div className={classNames} {...other}>
      {children}
    </div>
  );
};

FormItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FormItem;
