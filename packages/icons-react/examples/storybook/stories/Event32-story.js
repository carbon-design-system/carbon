import React from 'react';
import { storiesOf } from '@storybook/react';
import Event32 from '../../../es/event/32.js';

storiesOf('Event32', module)
  .add('default', () => <Event32 />)
  .add('with accessibility label', () => (
    <Event32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Event32 aria-label="Icon label">
      <title>Icon title</title>
    </Event32>
  ));
