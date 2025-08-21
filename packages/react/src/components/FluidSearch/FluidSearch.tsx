/**
 * Copyright IBM Corp. 2022, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import PropTypes from 'prop-types';
import React, { type ChangeEvent } from 'react';
import classnames from 'classnames';
import Search from '../Search';
import { usePrefix } from '../../internal/usePrefix';
import { FormContext } from '../FluidForm/FormContext';

export interface FluidSearchProps {
  /**
   * Specify an optional value for the `autocomplete` property on the underlying
   * `<input>`, defaults to "off"
   */
  autoComplete?: string;
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
  /**
   * Specify a label to be read by screen readers on the "close" button
   */
  closeButtonLabelText?: string;
  /**
   * Optionally provide the default value of the `<input>`
   */
  defaultValue?: string | number;
  /**
   * Specify whether the `<input>` should be disabled
   */
  disabled?: boolean;
  /**
   * Specify a custom `id` for the input
   */
  id?: string;
  /**
   * Provide the label text for the Search icon
   */
  labelText: React.ReactNode;
  /**
   * Optional callback called when the search value changes.
   */
  onChange?(event: ChangeEvent<HTMLInputElement>): void;
  /**
   * Optional callback called when the search value is cleared.
   */
  onClear?: () => void;
  /**
   * Provide a handler that is invoked on the key down event for the input
   */
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   */
  placeholder?: string;
  /**
   * Specify the role for the underlying `<input>`, defaults to `searchbox`
   */
  role?: string;
  /**
   * Optional prop to specify the type of the `<input>`
   */
  type?: string;
  /**
   * Specify the value of the `<input>`
   */
  value?: string | number;
}

const FluidSearch: React.FC<FluidSearchProps> = React.forwardRef<
  HTMLInputElement,
  FluidSearchProps
>(function FluidSearch({ className, ...other }, ref) {
  const prefix = usePrefix();
  const classNames = classnames(`${prefix}--search--fluid`, className);

  return (
    <FormContext.Provider value={{ isFluid: true }}>
      <Search ref={ref} className={classNames} {...other} />
    </FormContext.Provider>
  );
});

FluidSearch.propTypes = {
  /**
   * Specify an optional value for the `autocomplete` property on the underlying
   * `<input>`, defaults to "off"
   */
  autoComplete: PropTypes.string,

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
   * Optional callback called when the search value changes.
   */
  onChange: PropTypes.func,

  /**
   * Optional callback called when the search value is cleared.
   */
  onClear: PropTypes.func,

  /**
   * Provide a handler that is invoked on the key down event for the input
   */
  onKeyDown: PropTypes.func,

  /**
   * Provide an optional placeholder text for the Search.
   * Note: if the label and placeholder differ,
   * VoiceOver on Mac will read both
   */
  placeholder: PropTypes.string,

  /**
   * Specify the role for the underlying `<input>`, defaults to `searchbox`
   */
  role: PropTypes.string,

  /**
   * Optional prop to specify the type of the `<input>`
   */
  type: PropTypes.string,

  /**
   * Specify the value of the `<input>`
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default FluidSearch;
