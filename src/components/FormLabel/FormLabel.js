import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const FormLabel = ({ className, children, id, ...other }) => {
  const classNames = classnames(`${prefix}--label`, className);

  return (
    <label htmlFor={id} className={classNames} {...other}>
      {children}
    </label>
  );
};

FormLabel.propTypes = {
  /**
   * Specify the content of the form label
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied to the containing <label> node
   */
  className: PropTypes.string,

  /**
   * Provide a unique id for the given <FormLabel>
   */
  id: PropTypes.string,
};

export default FormLabel;
