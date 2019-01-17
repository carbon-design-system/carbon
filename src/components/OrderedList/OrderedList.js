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

const OrderedList = ({ children, className, nested, ...other }) => {
  const classNames = classnames(`${prefix}--list--ordered`, className, {
    [`${prefix}--list--nested`]: nested,
  });
  return (
    <ol className={classNames} {...other}>
      {children}
    </ol>
  );
};

OrderedList.propTypes = {
  /**
   * Provide list items to be rendered in the ordered list
   */
  children: PropTypes.node,

  /**
   * Provide an optional className to be applied to the containing <ol> node
   */
  className: PropTypes.string,

  /**
   * Specify whether this ordered list is nested inside of another nested list
   */
  nested: PropTypes.bool,
};

OrderedList.defaultProps = {
  nested: false,
};

export default OrderedList;
