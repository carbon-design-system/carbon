import React from 'react';
import { storiesOf } from '@storybook/react';
import RadioButton32 from '../../../lib/radio-button/32';

storiesOf('RadioButton32', module)
  .add('default', () => <RadioButton32 />)
  .add('with accessibility label', () => (
    <RadioButton32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RadioButton32 focusable>
      <title>Icon title</title>
    </RadioButton32>
  ));
