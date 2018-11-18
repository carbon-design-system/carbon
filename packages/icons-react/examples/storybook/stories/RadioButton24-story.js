import React from 'react';
import { storiesOf } from '@storybook/react';
import RadioButton24 from '../../../es/radio-button/24.js';

storiesOf('RadioButton24', module)
  .add('default', () => <RadioButton24 />)
  .add('with accessibility label', () => (
    <RadioButton24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RadioButton24 aria-label="Icon label">
      <title>Icon title</title>
    </RadioButton24>
  ));
