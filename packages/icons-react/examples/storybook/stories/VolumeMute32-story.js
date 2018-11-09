import React from 'react';
import { storiesOf } from '@storybook/react';
import VolumeMute32 from '../../../lib/VolumeMute/32';

storiesOf('VolumeMute32', module)
  .add('default', () => <VolumeMute32 />)
  .add('with accessibility label', () => (
    <VolumeMute32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <VolumeMute32 focusable>
      <title>Icon title</title>
    </VolumeMute32>
  ));
