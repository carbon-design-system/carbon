import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxUndeterminate32 from '../../../es/checkbox--undeterminate/32.js';

storiesOf('CheckboxUndeterminate32', module)
  .add('default', () => <CheckboxUndeterminate32 />)
  .add('with accessibility label', () => (
    <CheckboxUndeterminate32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxUndeterminate32 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxUndeterminate32>
  ));
