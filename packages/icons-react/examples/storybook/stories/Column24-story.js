import React from 'react';
import { storiesOf } from '@storybook/react';
import Column24 from '../../../es/column/24.js';

storiesOf('Column24', module)
  .add('default', () => <Column24 />)
  .add('with accessibility label', () => (
    <Column24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Column24 aria-label="Icon label">
      <title>Icon title</title>
    </Column24>
  ));
