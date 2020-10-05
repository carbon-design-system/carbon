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

class StructuredListCell extends Component {
  static propTypes = {
    /**
     * Provide the contents of your StructuredListCell
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether your StructuredListCell should be used as a header cell
     */
    head: PropTypes.bool,

    /**
     * Specify whether your StructuredListCell should have text wrapping
     */
    noWrap: PropTypes.bool,
  };

  static defaultProps = {
    head: false,
    noWrap: false,
  };

  render() {
    const { children, className, head, noWrap, ...other } = this.props;

    const classes = classNames(className, {
      [`${prefix}--structured-list-th`]: head,
      [`${prefix}--structured-list-td`]: !head,
      [`${prefix}--structured-list-content--nowrap`]: noWrap,
    });

    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}

export default StructuredListCell;
