import React from 'react';
import { storiesOf } from '@storybook/react';
import RadioButton20 from '../../../es/radio-button/20.js';

storiesOf('RadioButton20', module)
  .add('default', () => <RadioButton20 />)
  .add('with accessibility label', () => (
    <RadioButton20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RadioButton20 aria-label="Icon label">
      <title>Icon title</title>
    </RadioButton20>
  ));
