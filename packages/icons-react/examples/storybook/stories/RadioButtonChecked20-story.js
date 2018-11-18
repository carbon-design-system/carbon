import React from 'react';
import { storiesOf } from '@storybook/react';
import RadioButtonChecked20 from '../../../es/radio-button--checked/20.js';

storiesOf('RadioButtonChecked20', module)
  .add('default', () => <RadioButtonChecked20 />)
  .add('with accessibility label', () => (
    <RadioButtonChecked20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RadioButtonChecked20 aria-label="Icon label">
      <title>Icon title</title>
    </RadioButtonChecked20>
  ));
