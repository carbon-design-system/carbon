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
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;

class StructuredListWrapper extends Component {
  static propTypes = {
    /**
     * Specify a label to be read by screen readers on the container node
     */
    ariaLabel: PropTypes.string,

    /**
     * Specify whether a border should be added to your StructuredListWrapper
     */
    border: deprecate(
      PropTypes.bool,
      `\nThe prop \`border\` will be removed in the next major version of Carbon.`
    ),

    /**
     * Provide the contents of your StructuredListWrapper
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify whether your StructuredListWrapper should have selections
     */
    selection: PropTypes.bool,
  };

  static defaultProps = {
    selection: false,
    ariaLabel: 'Structured list section',
  };

  render() {
    const {
      children,
      selection,
      className,
      ariaLabel,
      border: _border,
      ...other
    } = this.props;

    const classes = classNames(`${prefix}--structured-list`, className, {
      [`${prefix}--structured-list--selection`]: selection,
    });

    return (
      <div className={classes} {...other} aria-label={ariaLabel}>
        {children}
      </div>
    );
  }
}

export default StructuredListWrapper;
