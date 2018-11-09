import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxCheckedFilled32 from '../../../lib/CheckboxCheckedFilled/32';

storiesOf('CheckboxCheckedFilled32', module)
  .add('default', () => <CheckboxCheckedFilled32 />)
  .add('with accessibility label', () => (
    <CheckboxCheckedFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxCheckedFilled32 focusable>
      <title>Icon title</title>
    </CheckboxCheckedFilled32>
  ));
