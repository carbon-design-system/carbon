import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordingFilled20 from '../../../es/recording--filled/20.js';

storiesOf('RecordingFilled20', module)
  .add('default', () => <RecordingFilled20 />)
  .add('with accessibility label', () => (
    <RecordingFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecordingFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </RecordingFilled20>
  ));
