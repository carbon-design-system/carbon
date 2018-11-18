import React from 'react';
import { storiesOf } from '@storybook/react';
import Reset24 from '../../../es/reset/24.js';

storiesOf('Reset24', module)
  .add('default', () => <Reset24 />)
  .add('with accessibility label', () => (
    <Reset24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Reset24 aria-label="Icon label">
      <title>Icon title</title>
    </Reset24>
  ));
