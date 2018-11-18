import React from 'react';
import { storiesOf } from '@storybook/react';
import RecordingFilledAlt20 from '../../../es/recording--filled--alt/20.js';

storiesOf('RecordingFilledAlt20', module)
  .add('default', () => <RecordingFilledAlt20 />)
  .add('with accessibility label', () => (
    <RecordingFilledAlt20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RecordingFilledAlt20 aria-label="Icon label">
      <title>Icon title</title>
    </RecordingFilledAlt20>
  ));
