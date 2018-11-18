import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordingFilledAlt32 from '../../../es/recording--filled--alt/32.js';

storiesOf('RecordingFilledAlt32', module)
  .add('default', () => <RecordingFilledAlt32 />)
  .add('with accessibility label', () => (
    <RecordingFilledAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecordingFilledAlt32 aria-label="Icon label">
      <title>Icon title</title>
    </RecordingFilledAlt32>
  ));
