import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordingFilledAlt24 from '../../../es/recording--filled--alt/24.js';

storiesOf('RecordingFilledAlt24', module)
  .add('default', () => <RecordingFilledAlt24 />)
  .add('with accessibility label', () => (
    <RecordingFilledAlt24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecordingFilledAlt24 aria-label="Icon label">
      <title>Icon title</title>
    </RecordingFilledAlt24>
  ));
