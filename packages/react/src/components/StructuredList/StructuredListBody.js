/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

class StructuredListBody extends Component {
  static propTypes = {
    /**
     * Provide the contents of your StructuredListBody
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    head: PropTypes.bool,

    /**
     * Provide a handler that is invoked on the key down event for the control
     */
    onKeyDown: PropTypes.func,
  };

  static defaultProps = {
    onKeyDown: () => {},
  };

  state = {
    labelRows: null,
    rowSelected: 0,
  };

  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames(`${prefix}--structured-list-tbody`, className);
    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

export default StructuredListBody;
