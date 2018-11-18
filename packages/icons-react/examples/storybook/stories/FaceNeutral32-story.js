import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceNeutral32 from '../../../es/face--neutral/32.js';

storiesOf('FaceNeutral32', module)
  .add('default', () => <FaceNeutral32 />)
  .add('with accessibility label', () => (
    <FaceNeutral32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceNeutral32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceNeutral32>
  ));
