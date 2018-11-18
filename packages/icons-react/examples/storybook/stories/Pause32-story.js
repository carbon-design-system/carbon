import React from 'react';
import { storiesOf } from '@storybook/react';
import Pause32 from '../../../es/pause/32.js';

storiesOf('Pause32', module)
  .add('default', () => <Pause32 />)
  .add('with accessibility label', () => (
    <Pause32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pause32 aria-label="Icon label">
      <title>Icon title</title>
    </Pause32>
  ));
