import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxChecked20 from '../../../es/checkbox--checked/20.js';

storiesOf('CheckboxChecked20', module)
  .add('default', () => <CheckboxChecked20 />)
  .add('with accessibility label', () => (
    <CheckboxChecked20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxChecked20 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxChecked20>
  ));
