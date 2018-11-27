import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const Form = ({ className, children, ...other }) => {
  const classNames = classnames(`${prefix}--form`, className);

  return (
    <form className={classNames} {...other}>
      {' '}
      {children}{' '}
    </form>
  );
};

Form.propTypes = {
  /**
   * Provide children to be rendered inside of the <form> element
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied on the containing <form> node
   */
  className: PropTypes.string,
};

export default Form;
