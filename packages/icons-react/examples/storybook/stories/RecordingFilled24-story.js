import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordingFilled24 from '../../../es/recording--filled/24.js';

storiesOf('RecordingFilled24', module)
  .add('default', () => <RecordingFilled24 />)
  .add('with accessibility label', () => (
    <RecordingFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecordingFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </RecordingFilled24>
  ));
