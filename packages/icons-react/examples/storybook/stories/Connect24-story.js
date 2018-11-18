import React from 'react';
import { storiesOf } from '@storybook/react';
import Connect24 from '../../../es/connect/24.js';

storiesOf('Connect24', module)
  .add('default', () => <Connect24 />)
  .add('with accessibility label', () => (
    <Connect24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Connect24 aria-label="Icon label">
      <title>Icon title</title>
    </Connect24>
  ));
