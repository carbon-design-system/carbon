import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxChecked32 from '../../../lib/CheckboxChecked/32';

storiesOf('CheckboxChecked32', module)
  .add('default', () => <CheckboxChecked32 />)
  .add('with accessibility label', () => (
    <CheckboxChecked32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxChecked32 focusable>
      <title>Icon title</title>
    </CheckboxChecked32>
  ));
