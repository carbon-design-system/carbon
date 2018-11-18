import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxCheckedFilled20 from '../../../es/checkbox--checked--filled/20.js';

storiesOf('CheckboxCheckedFilled20', module)
  .add('default', () => <CheckboxCheckedFilled20 />)
  .add('with accessibility label', () => (
    <CheckboxCheckedFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxCheckedFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxCheckedFilled20>
  ));
