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

const Form = ({ className, children, ...other }) => {
  const prefix = usePrefix();
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
