import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxChecked32 from '../../../es/checkbox--checked/32.js';

storiesOf('CheckboxChecked32', module)
  .add('default', () => <CheckboxChecked32 />)
  .add('with accessibility label', () => (
    <CheckboxChecked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxChecked32 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxChecked32>
  ));
