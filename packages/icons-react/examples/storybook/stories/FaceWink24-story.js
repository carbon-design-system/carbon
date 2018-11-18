import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceWink24 from '../../../es/face--wink/24.js';

storiesOf('FaceWink24', module)
  .add('default', () => <FaceWink24 />)
  .add('with accessibility label', () => (
    <FaceWink24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceWink24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceWink24>
  ));
