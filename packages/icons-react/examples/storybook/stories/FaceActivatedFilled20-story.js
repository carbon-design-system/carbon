import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivatedFilled20 from '../../../es/face--activated--filled/20.js';

storiesOf('FaceActivatedFilled20', module)
  .add('default', () => <FaceActivatedFilled20 />)
  .add('with accessibility label', () => (
    <FaceActivatedFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivatedFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceActivatedFilled20>
  ));
