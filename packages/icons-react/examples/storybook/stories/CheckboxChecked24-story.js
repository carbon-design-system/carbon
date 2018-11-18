import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxChecked24 from '../../../es/checkbox--checked/24.js';

storiesOf('CheckboxChecked24', module)
  .add('default', () => <CheckboxChecked24 />)
  .add('with accessibility label', () => (
    <CheckboxChecked24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxChecked24 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxChecked24>
  ));
