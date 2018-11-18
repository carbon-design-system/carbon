import React from 'react';
import { storiesOf } from '@storybook/react';
import CheckboxUndeterminate20 from '../../../es/checkbox--undeterminate/20.js';

storiesOf('CheckboxUndeterminate20', module)
  .add('default', () => <CheckboxUndeterminate20 />)
  .add('with accessibility label', () => (
    <CheckboxUndeterminate20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CheckboxUndeterminate20 aria-label="Icon label">
      <title>Icon title</title>
    </CheckboxUndeterminate20>
  ));
