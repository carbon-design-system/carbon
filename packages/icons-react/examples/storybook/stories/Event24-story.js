import React from 'react';
import { storiesOf } from '@storybook/react';
import Event24 from '../../../es/event/24.js';

storiesOf('Event24', module)
  .add('default', () => <Event24 />)
  .add('with accessibility label', () => (
    <Event24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Event24 aria-label="Icon label">
      <title>Icon title</title>
    </Event24>
  ));
