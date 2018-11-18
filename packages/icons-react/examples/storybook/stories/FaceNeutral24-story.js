import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceNeutral24 from '../../../es/face--neutral/24.js';

storiesOf('FaceNeutral24', module)
  .add('default', () => <FaceNeutral24 />)
  .add('with accessibility label', () => (
    <FaceNeutral24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceNeutral24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceNeutral24>
  ));
