import React from 'react';
import { storiesOf } from '@storybook/react';
import Connect20 from '../../../es/connect/20.js';

storiesOf('Connect20', module)
  .add('default', () => <Connect20 />)
  .add('with accessibility label', () => (
    <Connect20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Connect20 aria-label="Icon label">
      <title>Icon title</title>
    </Connect20>
  ));
