import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivatedAdd20 from '../../../es/face--activated--add/20.js';

storiesOf('FaceActivatedAdd20', module)
  .add('default', () => <FaceActivatedAdd20 />)
  .add('with accessibility label', () => (
    <FaceActivatedAdd20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivatedAdd20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceActivatedAdd20>
  ));
