import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxUndeterminate24 from '../../../es/checkbox--undeterminate/24.js';

storiesOf('CheckboxUndeterminate24', module)
  .add('default', () => <CheckboxUndeterminate24 />)
  .add('with accessibility label', () => (
    <CheckboxUndeterminate24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxUndeterminate24 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxUndeterminate24>
  ));
