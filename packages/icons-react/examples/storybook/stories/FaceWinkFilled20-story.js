import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceWinkFilled20 from '../../../es/face--wink--filled/20.js';

storiesOf('FaceWinkFilled20', module)
  .add('default', () => <FaceWinkFilled20 />)
  .add('with accessibility label', () => (
    <FaceWinkFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceWinkFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceWinkFilled20>
  ));
