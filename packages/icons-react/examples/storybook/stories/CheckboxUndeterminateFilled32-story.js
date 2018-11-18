import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxUndeterminateFilled32 from '../../../es/checkbox--undeterminate--filled/32.js';

storiesOf('CheckboxUndeterminateFilled32', module)
  .add('default', () => <CheckboxUndeterminateFilled32 />)
  .add('with accessibility label', () => (
    <CheckboxUndeterminateFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxUndeterminateFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxUndeterminateFilled32>
  ));
