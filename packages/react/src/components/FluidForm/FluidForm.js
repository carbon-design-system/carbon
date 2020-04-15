/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

const FluidForm = ({ className, children, ...other }) => {
  const classNames = classnames(
    `${prefix}--form`,
    `${prefix}--form--fluid`,
    className
  );

  const childrenWithProps = React.Children.map(children, child => {
    return React.cloneElement(child, { fluid: true });
  });

  return (
    <form className={classNames} {...other}>
      {' '}
      {childrenWithProps}{' '}
    </form>
  );
};

FluidForm.propTypes = {
  /**
   * Provide children to be rendered inside of the <form> element
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied on the containing <form> node
   */
  className: PropTypes.string,

  /**
   * `true` to use fluid variation of input field.
   */
  fluid: PropTypes.bool,
};

export default FluidForm;
