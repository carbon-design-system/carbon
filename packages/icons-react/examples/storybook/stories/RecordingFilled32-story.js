import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordingFilled32 from '../../../es/recording--filled/32.js';

storiesOf('RecordingFilled32', module)
  .add('default', () => <RecordingFilled32 />)
  .add('with accessibility label', () => (
    <RecordingFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecordingFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </RecordingFilled32>
  ));
