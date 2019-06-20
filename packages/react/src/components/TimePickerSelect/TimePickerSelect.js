/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import ChevronDownGlyph from '@carbon/icons-react/lib/chevron--down/index';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class TimePickerSelect extends Component {
  static propTypes = {
    /**
     * Provide the contents of your TimePickerSelect
     */
    children: PropTypes.node,

    /**
     * Specify an optional className to be applied to the node containing the label and the select box
     */
    className: PropTypes.string,

    /**
     * Specify a custom `id` for the `<select>`
     */
    id: PropTypes.string.isRequired,

    /**
     * Specify whether you want the inline version of this control
     */
    inline: PropTypes.bool,

    /**
     * Specify whether the control is disabled
     */
    disabled: PropTypes.bool,

    /**
     * Optionally provide the default value of the `<select>`
     */
    defaultValue: PropTypes.any,

    /**
     * Provide a description for the twistie icon that can be read by screen readers
     */
    iconDescription: PropTypes.string.isRequired,

    /**
     * Specify whether the label should be hidden, or not
     */
    hideLabel: PropTypes.bool,

    /**
     * Provide label text to be read by screen readers when interacting with the
     * control
     */
    labelText: PropTypes.node.isRequired,
  };

  static defaultProps = {
    disabled: false,
    inline: true,
    iconDescription: 'open list of options',
    hideLabel: true,
  };

  render() {
    const {
      id,
      disabled,
      children,
      iconDescription,
      className,
      hideLabel,
      labelText,
      inline, // eslint-disable-line
      ...other
    } = this.props;

    const selectClasses = classNames({
      [`${prefix}--select`]: true,
      [`${prefix}--time-picker__select`]: true,
      [className]: className,
    });

    const labelClasses = classNames(`${prefix}--label`, {
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const label = labelText ? (
      <label htmlFor={id} className={labelClasses}>
        {labelText}
      </label>
    ) : null;

    return (
      <div className={selectClasses}>
        {label}
        <select
          {...other}
          id={id}
          className={`${prefix}--select-input`}
          disabled={disabled}>
          {children}
        </select>
        <ChevronDownGlyph
          className={`${prefix}--select__arrow`}
          aria-label={iconDescription}>
          {iconDescription && <title>{iconDescription}</title>}
        </ChevronDownGlyph>
      </div>
    );
  }
}
