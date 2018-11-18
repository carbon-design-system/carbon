import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceWinkFilled24 from '../../../es/face--wink--filled/24.js';

storiesOf('FaceWinkFilled24', module)
  .add('default', () => <FaceWinkFilled24 />)
  .add('with accessibility label', () => (
    <FaceWinkFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceWinkFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceWinkFilled24>
  ));
