import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivatedAdd24 from '../../../es/face--activated--add/24.js';

storiesOf('FaceActivatedAdd24', module)
  .add('default', () => <FaceActivatedAdd24 />)
  .add('with accessibility label', () => (
    <FaceActivatedAdd24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivatedAdd24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceActivatedAdd24>
  ));
