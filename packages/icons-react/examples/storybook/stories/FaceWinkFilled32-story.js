import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceWinkFilled32 from '../../../es/face--wink--filled/32.js';

storiesOf('FaceWinkFilled32', module)
  .add('default', () => <FaceWinkFilled32 />)
  .add('with accessibility label', () => (
    <FaceWinkFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceWinkFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceWinkFilled32>
  ));
