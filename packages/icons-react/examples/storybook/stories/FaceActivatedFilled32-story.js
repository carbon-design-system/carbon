import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivatedFilled32 from '../../../lib/face--activated--filled/32';

storiesOf('FaceActivatedFilled32', module)
  .add('default', () => <FaceActivatedFilled32 />)
  .add('with accessibility label', () => (
    <FaceActivatedFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivatedFilled32 focusable>
      <title>Icon title</title>
    </FaceActivatedFilled32>
  ));
