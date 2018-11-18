import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxUndeterminateFilled24 from '../../../es/checkbox--undeterminate--filled/24.js';

storiesOf('CheckboxUndeterminateFilled24', module)
  .add('default', () => <CheckboxUndeterminateFilled24 />)
  .add('with accessibility label', () => (
    <CheckboxUndeterminateFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxUndeterminateFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxUndeterminateFilled24>
  ));
