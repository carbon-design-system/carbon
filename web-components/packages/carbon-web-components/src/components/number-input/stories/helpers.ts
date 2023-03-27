/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';
import { INPUT_SIZE } from '../../input/input';

const sizes = {
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium size (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large size (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const createProps = ({ boolean, number, select, text }) => ({
  allowEmpty: boolean('Allow empty (allow-empty)', false),
  decrementButtonDescription: text(
    'Decrement button assistive description (decrement-button-assistive-text)',
    'decrease number input'
  ),
  incrementButtonDescription: text(
    'Increment button assistive description (increment-button-assistive-text)',
    'increase number input'
  ),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helper-text)', 'Optional helper text'),
  hideLabel: boolean('Hide label (hide-label)', false),
  hideSteppers: boolean('Hide steppers (hide-steppers)', false),
  invalid: boolean('Invalid (invalid)', false),
  invalidText: text('Invalid text (invalid-text)', 'Number is not valid'),
  label: text('Label (label)', 'number-input label'),
  readonly: boolean('Read only (readonly)', false),
  value: number('Value (value)', 50),
  warn: boolean('Warn (warn)', false),
  warnText: text('Warn text (warn-text)', 'Warning text'),
  min: number('Minimum value (min)', 0),
  max: number('Maximum value (max)', 100),
  step: number('Value to step the input by (step)', 1),
  size: select('Size (size)', sizes, INPUT_SIZE.MEDIUM),
  onInput: action('input'),
});

export default createProps;
