/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';
import { INPUT_SIZE } from '../../input/input';
import { NUMBER_INPUT_COLOR_SCHEME } from '../number-input';

const colorSchemes = {
  Regular: null,
  [`Light (${NUMBER_INPUT_COLOR_SCHEME.LIGHT})`]:
    NUMBER_INPUT_COLOR_SCHEME.LIGHT,
};

const sizes = {
  Regular: null,
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Extra large size (${INPUT_SIZE.EXTRA_LARGE})`]: INPUT_SIZE.EXTRA_LARGE,
};

const createProps = ({ boolean, textNullable, number, select }) => ({
  colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
  disabled: boolean('Disabled (disabled)', false),
  value: number('Input value (value)', 0),
  min: number('Minimum value (min)', 0),
  max: number('Maximum value (max)', 100),
  step: number('Value to step the input by (step)', 1),
  size: select('Input size (size)', sizes, INPUT_SIZE.REGULAR),
  placeholder: textNullable(
    'Placeholder text (placeholder)',
    'Optional placeholder text'
  ),
  invalid: boolean('Invalid (invalid)', false),
  onInput: action('input'),
  mobile: boolean('Mobile mode (mobile)', false),
  hideLabel: boolean('Hide label (hideLabel)', false),
});

export default createProps;
