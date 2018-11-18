import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceAdd24 from '../../../es/face--add/24.js';

storiesOf('FaceAdd24', module)
  .add('default', () => <FaceAdd24 />)
  .add('with accessibility label', () => (
    <FaceAdd24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceAdd24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceAdd24>
  ));
