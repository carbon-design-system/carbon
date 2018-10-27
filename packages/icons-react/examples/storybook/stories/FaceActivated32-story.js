import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivated32 from '../../../lib/face--activated/32';

storiesOf('FaceActivated32', module)
  .add('default', () => <FaceActivated32 />)
  .add('with accessibility label', () => (
    <FaceActivated32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivated32 focusable>
      <title>Icon title</title>
    </FaceActivated32>
  ));
