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

const UnorderedList = ({ children, className, nested, ...other }) => {
  const classNames = classnames(`${prefix}--list--unordered`, className, {
    [`${prefix}--list--nested`]: nested,
  });
  return (
    <ul className={classNames} {...other}>
      {children}
    </ul>
  );
};

UnorderedList.propTypes = {
  /**
   * Specify a collection of ListItem's to be rendered in the UnorderedList
   */
  children: PropTypes.node,

  /**
   * Specify an optional className to be applied to the underlying <ul> node
   */
  className: PropTypes.string,

  /**
   * Specify whether the list is nested, or not
   */
  nested: PropTypes.bool,
};

UnorderedList.defaultProps = {
  nested: false,
};

export default UnorderedList;
