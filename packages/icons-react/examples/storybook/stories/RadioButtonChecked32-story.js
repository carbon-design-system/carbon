import React from 'react';
import { storiesOf } from '@storybook/react';
import RadioButtonChecked32 from '../../../lib/radio-button--checked/32';

storiesOf('RadioButtonChecked32', module)
  .add('default', () => <RadioButtonChecked32 />)
  .add('with accessibility label', () => (
    <RadioButtonChecked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RadioButtonChecked32 focusable>
      <title>Icon title</title>
    </RadioButtonChecked32>
  ));
