import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeDown32 from '../../../lib/VolumeDown/32';

storiesOf('VolumeDown32', module)
  .add('default', () => <VolumeDown32 />)
  .add('with accessibility label', () => (
    <VolumeDown32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeDown32 focusable>
      <title>Icon title</title>
    </VolumeDown32>
  ));
