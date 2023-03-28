/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';

const createProps = ({ boolean, textNullable, number }) => ({
  cols: number('Number of columns (cols)', 0),
  disabled: boolean('Disabled (disabled)', false),
  enableCounter: boolean('Enable character counter (enable-counter)', true),
  helperText: textNullable('Helper text (helper-text)', 'Textarea helper text'),
  hideLabel: boolean('Hide label (hide-label)', false),
  invalid: boolean('Invalid (invalid)', false),
  invalidText: textNullable('Invalid text (invalid-text)', 'Invalid text'),
  label: textNullable('Label (label)', 'Textarea label'),
  maxCount: number('Max character count (max-count', 500),
  onInput: action('input'),
  placeholder: textNullable('Placeholder text (placeholder)', ''),
  readonly: boolean('Read only (readonly)', false),
  rows: number('Number of rows (rows)', 4),
  value: textNullable('Value (value)', ''),
  warn: boolean('Warn (warn)', false),
  warnText: textNullable('Warn text (warn-text)', 'This is a warning message.'),
});

export default createProps;
