import React from 'react';
import { storiesOf } from '@storybook/react';
import Event32 from '../../../lib/event/32';

storiesOf('Event32', module)
  .add('default', () => <Event32 />)
  .add('with accessibility label', () => (
    <Event32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Event32 focusable>
      <title>Icon title</title>
    </Event32>
  ));
