import React from 'react';
import { storiesOf } from '@storybook/react';
import RadioButtonChecked24 from '../../../es/radio-button--checked/24.js';

storiesOf('RadioButtonChecked24', module)
  .add('default', () => <RadioButtonChecked24 />)
  .add('with accessibility label', () => (
    <RadioButtonChecked24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RadioButtonChecked24 aria-label="Icon label">
      <title>Icon title</title>
    </RadioButtonChecked24>
  ));
