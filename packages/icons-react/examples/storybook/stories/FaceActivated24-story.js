import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivated24 from '../../../es/face--activated/24.js';

storiesOf('FaceActivated24', module)
  .add('default', () => <FaceActivated24 />)
  .add('with accessibility label', () => (
    <FaceActivated24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivated24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceActivated24>
  ));
