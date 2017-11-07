import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

const Form = ({ className, children, ...other }) => {
  const classNames = classnames('bx--form', className);

  return (
    <form className={classNames} {...other}>
      {' '}
      {children}{' '}
    </form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Form;
