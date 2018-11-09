import React from 'react';
import { storiesOf } from '@storybook/react';
import Pause32 from '../../../lib/Pause/32';

storiesOf('Pause32', module)
  .add('default', () => <Pause32 />)
  .add('with accessibility label', () => (
    <Pause32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pause32 focusable>
      <title>Icon title</title>
    </Pause32>
  ));
