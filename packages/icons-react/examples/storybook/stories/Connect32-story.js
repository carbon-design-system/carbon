import React from 'react';
import { storiesOf } from '@storybook/react';
import Connect32 from '../../../es/connect/32.js';

storiesOf('Connect32', module)
  .add('default', () => <Connect32 />)
  .add('with accessibility label', () => (
    <Connect32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Connect32 aria-label="Icon label">
      <title>Icon title</title>
    </Connect32>
  ));
