import * as React from 'react';
import { ForwardRefReturn, ReactInputAttr } from '../../typings/shared';

type ExcludedAttributes = 'id' | 'onChange' | 'onClick' | 'type';

export interface CheckboxProps
  extends Omit<ReactInputAttr, ExcludedAttributes> {
  /**
   * Provide an `id` to uniquely identify the Checkbox input
   */
  id: string;

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  labelText: NonNullable<React.ReactNode>;

  /**
   * Specify whether the underlying input should be checked by default
   */
  defaultChecked?: boolean;

  /**
   * Specify whether the Checkbox should be disabled
   */
  disabled?: boolean;

  /**
   * Specify whether the label should be hidden, or not
   */
  hideLabel?: boolean;

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  indeterminate?: boolean;

  /**
   * Provide an optional handler that is called when the internal state of
   * Checkbox changes. This handler is called with event and state info.
   * `(event, { checked, id }) => void`
   */
  onChange?: (
    evt: React.ChangeEvent<HTMLInputElement>,
    data: { checked: boolean; id: string }
  ) => void;
}

declare const Checkbox: ForwardRefReturn<HTMLInputElement, CheckboxProps>;

export default Checkbox;
