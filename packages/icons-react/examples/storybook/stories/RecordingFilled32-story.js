import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordingFilled32 from '../../../lib/recording--filled/32';

storiesOf('RecordingFilled32', module)
  .add('default', () => <RecordingFilled32 />)
  .add('with accessibility label', () => (
    <RecordingFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecordingFilled32 focusable>
      <title>Icon title</title>
    </RecordingFilled32>
  ));
