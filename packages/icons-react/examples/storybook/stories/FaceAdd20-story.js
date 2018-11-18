import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceAdd20 from '../../../es/face--add/20.js';

storiesOf('FaceAdd20', module)
  .add('default', () => <FaceAdd20 />)
  .add('with accessibility label', () => (
    <FaceAdd20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceAdd20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceAdd20>
  ));
