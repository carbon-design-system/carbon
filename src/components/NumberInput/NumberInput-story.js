import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NumberInput from '../NumberInput';

const numberInputProps = {
  className: 'some-class',
  id: 'tj-input',
  label: 'Number Input label',
  onChange: action('onChange'),
  onClick: action('onClick'),
  min: 0,
  max: 100,
  value: 50,
  step: 10,
  invalidText: 'Number is not valid',
};

const introText = `
  Number inputs are similar to text fields, but contain controls used to increase or decrease an incremental value. The Number Input component can be passed a starting value, a min, a max, and the step.
`;

storiesOf('NumberInput', module)
  .addWithInfo(
    'enabled',
    `
      ${introText}
      The example below shows an enabled Number Input component.
    `,
    () => <NumberInput {...numberInputProps} />
  )
  .addWithInfo(
    'disabled',
    `
      ${introText}
      The example below shows an disabled Number Input component.
    `,
    () => <NumberInput disabled {...numberInputProps} />
  )
  .addWithInfo(
    'invalid',
    `
      ${introText}
      The example below shows an disabled Number Input component.
    `,
    () => <NumberInput {...numberInputProps} invalid />
  );
