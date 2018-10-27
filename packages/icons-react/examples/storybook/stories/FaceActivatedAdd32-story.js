import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceActivatedAdd32 from '../../../lib/face--activated--add/32';

storiesOf('FaceActivatedAdd32', module)
  .add('default', () => <FaceActivatedAdd32 />)
  .add('with accessibility label', () => (
    <FaceActivatedAdd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceActivatedAdd32 focusable>
      <title>Icon title</title>
    </FaceActivatedAdd32>
  ));
