import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivatedFilled24 from '../../../es/face--activated--filled/24.js';

storiesOf('FaceActivatedFilled24', module)
  .add('default', () => <FaceActivatedFilled24 />)
  .add('with accessibility label', () => (
    <FaceActivatedFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivatedFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceActivatedFilled24>
  ));
