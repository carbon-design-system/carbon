import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const FormLabel = ({ className, children, id, ...other }) => {
  const classNames = classnames('bx--label', className);

  return (
    <label htmlFor={id} className={classNames} {...other}>
      {children}
    </label>
  );
};

FormLabel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default FormLabel;
