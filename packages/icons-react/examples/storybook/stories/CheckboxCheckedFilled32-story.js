import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxCheckedFilled32 from '../../../es/checkbox--checked--filled/32.js';

storiesOf('CheckboxCheckedFilled32', module)
  .add('default', () => <CheckboxCheckedFilled32 />)
  .add('with accessibility label', () => (
    <CheckboxCheckedFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxCheckedFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxCheckedFilled32>
  ));
