import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivated32 from '../../../es/face--activated/32.js';

storiesOf('FaceActivated32', module)
  .add('default', () => <FaceActivated32 />)
  .add('with accessibility label', () => (
    <FaceActivated32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivated32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceActivated32>
  ));
