import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceWink20 from '../../../es/face--wink/20.js';

storiesOf('FaceWink20', module)
  .add('default', () => <FaceWink20 />)
  .add('with accessibility label', () => (
    <FaceWink20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceWink20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceWink20>
  ));
