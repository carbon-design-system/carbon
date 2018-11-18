import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxUndeterminateFilled20 from '../../../es/checkbox--undeterminate--filled/20.js';

storiesOf('CheckboxUndeterminateFilled20', module)
  .add('default', () => <CheckboxUndeterminateFilled20 />)
  .add('with accessibility label', () => (
    <CheckboxUndeterminateFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxUndeterminateFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxUndeterminateFilled20>
  ));
