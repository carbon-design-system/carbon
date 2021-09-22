/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

const FormLabel = ({ className, children, id, ...other }) => {
  const prefix = usePrefix();
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
