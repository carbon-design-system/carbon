import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivated20 from '../../../es/face--activated/20.js';

storiesOf('FaceActivated20', module)
  .add('default', () => <FaceActivated20 />)
  .add('with accessibility label', () => (
    <FaceActivated20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivated20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceActivated20>
  ));
