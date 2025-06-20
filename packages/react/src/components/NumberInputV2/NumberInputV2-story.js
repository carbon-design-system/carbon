/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import {
  withKnobs,
  boolean,
  number,
  text,
  object,
  select,
} from '@storybook/addon-knobs';

import NumberInputV2 from './NumberInputV2';
import mdx from './NumberInputV2.mdx';

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const locales = {
  English: 'en-US',
  German: 'de-DE',
};

const reusableProps = {
  min: -100000000,
  max: 100000000,
};

const props = () => ({
  className: 'some-class',
  id: 'tj-input',
  label: text('Label (label)', 'NumberInput label'),
  hideLabel: boolean('No label (hideLabel)', false),
  hideSteppers: boolean('No steppers (hideSteppers)', false),
  min: number('Minimum value (min)', reusableProps.min),
  max: number('Maximum value (max)', reusableProps.max),
  step: number('Step of up/down arrow (step)', 10),
  size: select('Field size (size)', sizes, undefined) || undefined,
  locale: select('Locale', locales, undefined) || undefined,
  type: 'text',
  disabled: boolean('Disabled (disabled)', false),
  readOnly: boolean('Read only (readOnly)', false),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text(
    'Form validation UI content (invalidText)',
    'Number is not valid'
  ),
  warn: boolean('Show warning state (warn)', false),
  warnText: text(
    'Warning state text (warnText)',
    'A high threshold may impact performance'
  ),
  helperText: text('Helper text (helperText)', 'Optional helper text.'),
  light: boolean('Light variant (light)', false),
  onChange: action('onChange'),
  onClick: action('onClick'),
  numberInputArrowTranslationIds: object(
    'Number input arrow icon translation IDs (for translateWithId callback)',
    {
      'increment.number': 'Increment number',
      'decrement.number': 'Decrement number',
    }
  ),
});

export default {
  title: 'Components/NumberInputV2',
  component: NumberInputV2,
  decorators: [withKnobs],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => {
  return (
    <NumberInputV2
      id="default-number-input"
      min={reusableProps.min}
      max={reusableProps.max}
      inputMode="decimal"
      defaultValue={50}
      label="NumberInput label"
      invalidText={`Number is not valid. Must be between ${reusableProps.min} and ${reusableProps.max}`}
      type={'text'}
      locale={'en-US'}
    />
  );
};

Default.story = {
  name: 'Number Input Type Text',
};

export const Playground = () => {
  const { numberInputArrowTranslationIds, ...rest } = props();
  return (
    <NumberInputV2
      id="playground-number-input"
      translateWithId={(id) => numberInputArrowTranslationIds[id]}
      defaultValue={50}
      {...rest}
    />
  );
};
