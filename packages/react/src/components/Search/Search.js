/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { Search16, Close16 } from '@carbon/icons-react';
import { settings } from 'carbon-components';
import { composeEventHandlers } from '../../tools/events';
import { keys, match } from '../../internal/keyboard';
import deprecate from '../../prop-types/deprecate';

const { prefix } = settings;

export default class Search extends Component {
  static propTypes = {
    /**
     * Specify an optional className to be applied to the container node
     */
    className: PropTypes.string,

    /**
     * Specify a label to be read by screen readers on the "close" button
     */
    closeButtonLabelText: PropTypes.string,

    /**
     * Optionally provide the default value of the `<input>`
     */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Specify whether the `<input>` should be disabled
     */
    disabled: PropTypes.bool,

    /**
     * Specify a custom `id` for the input
     */
    id: PropTypes.string,

    /**
     * Provide the label text for the Search icon
     */
    labelText: PropTypes.node.isRequired,

    /**
     * Specify light version or default version of this control
     */
    light: PropTypes.bool,

    /**
     * Optional callback called when the search value changes.
     */
    onChange: PropTypes.func,

    /**
     * Provide a handler that is invoked on the key down event for the input
     */
    onKeyDown: PropTypes.func,

    /**
     * Provide an optional placeholder text for the Search.
     * Note: if the label and placeholder differ,
     * VoiceOver on Mac will read both
     */
    placeHolderText: PropTypes.string,

    /**
     * Specify the search size
     */
    size: PropTypes.oneOf(['sm', 'lg', 'xl']),

    /**
     * Specify whether the Search should be a small variant
     */

    /**
     * Specify whether the load was successful
     */
    small: deprecate(
      PropTypes.bool,
      `\nThe prop \`small\` for Search has been deprecated in favor of \`size\`. Please use \`size="sm"\` instead.`
    ),

    /**
     * Optional prop to specify the type of the `<input>`
     */
    type: PropTypes.string,

    /**
     * Specify the value of the `<input>`
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    type: 'text',
    placeHolderText: '',
    closeButtonLabelText: 'Clear search input',
    onChange: () => {},
  };

  state = {
    hasContent: this.props.value || this.props.defaultValue || false,
    prevValue: this.props.value,
  };

  static getDerivedStateFromProps({ value }, state) {
    const { prevValue } = state;
    return prevValue === value
      ? null
      : {
          hasContent: !!value,
          prevValue: value,
        };
  }

  clearInput = (evt) => {
    if (!this.props.value) {
      this.input.value = '';
      this.props.onChange(evt);
    } else {
      const clearedEvt = Object.assign({}, evt.target, {
        target: {
          value: '',
        },
      });
      this.props.onChange(clearedEvt);
    }

    this.setState({ hasContent: false }, () => this.input.focus());
  };

  handleChange = (evt) => {
    this.setState({
      hasContent: evt.target.value !== '',
    });

    this.props.onChange(evt);
  };

  handleKeyDown = (evt) => {
    if (match(evt, keys.Escape)) {
      this.clearInput(evt);
    }
  };

  render() {
    const {
      className,
      type,
      id = (this._inputId =
        this._inputId ||
        `search__input__id_${Math.random().toString(36).substr(2)}`),
      placeHolderText,
      labelText,
      closeButtonLabelText,
      small,
      size = !small ? 'xl' : 'sm',
      light,
      disabled,
      onChange,
      onKeyDown,
      ...other
    } = this.props;

    const { hasContent } = this.state;

    const searchClasses = classNames({
      [`${prefix}--search`]: true,
      [`${prefix}--search--${size}`]: size,
      [`${prefix}--search--light`]: light,
      [`${prefix}--search--disabled`]: disabled,
      [className]: className,
    });

    const clearClasses = classNames({
      [`${prefix}--search-close`]: true,
      [`${prefix}--search-close--hidden`]: !hasContent,
    });

    const searchId = `${id}-search`;

    return (
      <div role="search" aria-labelledby={searchId} className={searchClasses}>
        <Search16 className={`${prefix}--search-magnifier`} />
        <label id={searchId} htmlFor={id} className={`${prefix}--label`}>
          {labelText}
        </label>
        <input
          role="searchbox"
          autoComplete="off"
          {...other}
          type={type}
          disabled={disabled}
          className={`${prefix}--search-input`}
          id={id}
          placeholder={placeHolderText}
          onChange={composeEventHandlers([onChange, this.handleChange])}
          onKeyDown={composeEventHandlers([onKeyDown, this.handleKeyDown])}
          ref={(input) => {
            this.input = input;
          }}
        />
        <button
          className={clearClasses}
          disabled={disabled}
          onClick={this.clearInput}
          type="button"
          aria-label={closeButtonLabelText}>
          <Close16 />
        </button>
      </div>
    );
  }
}
