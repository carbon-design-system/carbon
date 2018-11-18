import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivatedFilled32 from '../../../es/face--activated--filled/32.js';

storiesOf('FaceActivatedFilled32', module)
  .add('default', () => <FaceActivatedFilled32 />)
  .add('with accessibility label', () => (
    <FaceActivatedFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivatedFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceActivatedFilled32>
  ));
