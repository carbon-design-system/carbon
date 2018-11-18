import React from 'react';
import { storiesOf } from '@storybook/react';
import RadioButtonChecked32 from '../../../es/radio-button--checked/32.js';

storiesOf('RadioButtonChecked32', module)
  .add('default', () => <RadioButtonChecked32 />)
  .add('with accessibility label', () => (
    <RadioButtonChecked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RadioButtonChecked32 aria-label="Icon label">
      <title>Icon title</title>
    </RadioButtonChecked32>
  ));
