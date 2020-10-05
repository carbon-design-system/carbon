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

class StructuredListRow extends Component {
  static propTypes = {
    /**
     * Provide the contents of your StructuredListRow
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether your StructuredListRow should be used as a header row
     */
    head: PropTypes.bool,

    /**
     * Specify whether a `<label>` should be used
     */
    label: PropTypes.bool,

    /**
     * Provide a handler that is invoked on the key down event for the control,
     * if `<label>` is in use
     */
    onKeyDown: PropTypes.func,

    /**
     * Specify the tab index of the container node, if `<label>` is in use
     */
    tabIndex: PropTypes.number,
  };

  static defaultProps = {
    head: false,
    label: false,
    tabIndex: 0,
    onKeyDown: () => {},
  };

  render() {
    const {
      onKeyDown,
      tabIndex,
      children,
      className,
      head,
      label,
      ...other
    } = this.props;

    const classes = classNames(`${prefix}--structured-list-row`, className, {
      [`${prefix}--structured-list-row--header-row`]: head,
    });

    return label ? (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <label
        {...other}
        tabIndex={tabIndex}
        className={classes}
        onKeyDown={onKeyDown}>
        {children}
      </label>
    ) : (
      <div {...other} className={classes}>
        {children}
      </div>
    );
  }
}

export default StructuredListRow;
