import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxCheckedFilled24 from '../../../es/checkbox--checked--filled/24.js';

storiesOf('CheckboxCheckedFilled24', module)
  .add('default', () => <CheckboxCheckedFilled24 />)
  .add('with accessibility label', () => (
    <CheckboxCheckedFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxCheckedFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxCheckedFilled24>
  ));
