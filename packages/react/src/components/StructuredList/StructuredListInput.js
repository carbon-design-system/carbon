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
import setupGetInstanceId from '../../tools/setupGetInstanceId';

const { prefix } = settings;

const getInstanceId = setupGetInstanceId();

class StructuredListInput extends Component {
  static propTypes = {
    /**
     * Specify an optional className to be applied to the input
     */
    className: PropTypes.string,

    /**
     * Specify whether the underlying input should be checked by default
     */
    defaultChecked: PropTypes.bool,

    /**
     * Specify a custom `id` for the input
     */
    id: PropTypes.string,

    /**
     * Provide a `name` for the input
     */
    name: PropTypes.string,

    /**
     * Provide an optional hook that is called each time the input is updated
     */
    onChange: PropTypes.func,

    /**
     * Provide a `title` for the input
     */
    title: PropTypes.string,

    /**
     * Specify the value of the input
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };

  static defaultProps = {
    onChange: () => {},
    value: 'value',
    title: 'title',
  };

  constructor(props) {
    super(props);
    this.uid = this.props.id || getInstanceId();
  }

  render() {
    const { className, value, name, title, ...other } = this.props;
    const classes = classNames(`${prefix}--structured-list-input`, className);
    return (
      <input
        {...other}
        type="radio"
        tabIndex={-1}
        id={this.uid}
        className={classes}
        value={value}
        name={name}
        title={title}
      />
    );
  }
}

export default StructuredListInput;
