/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { settings } from 'carbon-components';
import setupGetInstanceId from '../../tools/setupGetInstanceId';
import { keys, match } from '../../tools/key';

const { prefix } = settings;
const getInstanceId = setupGetInstanceId();

class Toggle extends React.Component {
  static propTypes = {
    /**
     * Specify a custom className to apply to the form-item node
     */
    className: PropTypes.string,

    /**
     * Specify whether the toggle should be on by default
     */
    defaultToggled: PropTypes.bool,

    /**
     * Provide an optional hook that is called when the control is toggled
     */
    onToggle: PropTypes.func,

    /**
     * Provide an id that unique represents the underlying <input>
     */
    id: PropTypes.string.isRequired,

    /**
     * Specify whether the control is toggled
     */
    toggled: PropTypes.bool,

    /**
     * Provide the text that will be read by a screen reader when visiting this
     * control
     * `aria-label` is always required but will be null if `labelText` is also
     * provided
     */
    labelText: PropTypes.string,
    ['aria-label']: PropTypes.string.isRequired,

    /**
     * Specify the label for the "off" position
     */
    labelA: PropTypes.string.isRequired,

    /**
     * Specify the label for the "on" position
     */
    labelB: PropTypes.string.isRequired,
  };

  static defaultProps = {
    defaultToggled: false,
    ['aria-label']: 'Toggle',
    labelA: 'Off',
    labelB: 'On',
    onToggle: () => {},
  };

  render() {
    const {
      className,
      defaultToggled,
      toggled,
      onChange,
      onToggle,
      id = (this.inputId =
        this.inputId || `__carbon-toggle_${getInstanceId()}`),
      labelText,
      labelA,
      labelB,
      ...other
    } = this.props;

    let input;
    const wrapperClasses = classNames(`${prefix}--form-item`, {
      [className]: className,
    });

    const checkedProps = {};

    if (typeof toggled !== 'undefined') {
      checkedProps.checked = toggled;
    } else {
      checkedProps.defaultChecked = defaultToggled;
    }

    return (
      <div className={wrapperClasses}>
        <input
          {...other}
          {...checkedProps}
          aria-label={null}
          type="checkbox"
          id={id}
          className={`${prefix}--toggle-input`}
          onChange={evt => {
            onChange && onChange(evt);
            onToggle(input.checked, id, evt);
          }}
          ref={el => {
            input = el;
          }}
          onKeyUp={evt => {
            if (match(evt, keys.ENTER)) {
              input.checked = !input.checked;
              onChange(evt);
              onToggle(input.checked, id, evt);
            }
          }}
        />
        <label
          className={`${prefix}--toggle-input__label`}
          htmlFor={id}
          aria-label={labelText ? null : this.props['aria-label']}>
          {labelText}
          <span className={`${prefix}--toggle__switch`}>
            <span className={`${prefix}--toggle__text--off`} aria-hidden="true">
              {labelA}
            </span>
            <span className={`${prefix}--toggle__text--on`} aria-hidden="true">
              {labelB}
            </span>
          </span>
        </label>
      </div>
    );
  }
}

export default Toggle;
