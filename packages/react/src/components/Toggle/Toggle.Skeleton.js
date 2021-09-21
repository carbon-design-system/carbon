/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { settings } from 'carbon-components';

const { prefix } = settings;

export default class ToggleSkeleton extends React.Component {
  static propTypes = {
    ['aria-label']: PropTypes.string.isRequired,

    /**
     * Specify an optional className to add to the form item wrapper.
     */
    className: PropTypes.string,
    /**
     * Provide an id that unique represents the underlying `<input>`
     */
    id: PropTypes.string,

    /**
     * Provide the text that will be read by a screen reader when visiting this
     * control
     * `aria-label` is always required but will be null if `labelText` is also
     * provided
     */
    labelText: PropTypes.string,
  };

  static defaultProps = {
    ['aria-label']: 'Toggle is loading',
  };

  render() {
    const { id, labelText, className, ...rest } = this.props;

    return (
      <div className={cx(`${prefix}--form-item`, className)} {...rest}>
        <input
          type="checkbox"
          id={id}
          className={`${prefix}--toggle ${prefix}--skeleton`}
        />

        <label
          className={`${prefix}--toggle-input__label`}
          htmlFor={id}
          aria-label={labelText ? null : this.props['aria-label']}>
          {labelText}
          <span className={`${prefix}--toggle__switch`}>
            <span className={`${prefix}--toggle__text--left`} />
            <span className={`${prefix}--toggle__appearance`} />
            <span className={`${prefix}--toggle__text--right`} />
          </span>
        </label>
      </div>
    );
  }
}
