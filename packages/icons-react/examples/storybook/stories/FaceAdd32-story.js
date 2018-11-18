import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceAdd32 from '../../../es/face--add/32.js';

storiesOf('FaceAdd32', module)
  .add('default', () => <FaceAdd32 />)
  .add('with accessibility label', () => (
    <FaceAdd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceAdd32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceAdd32>
  ));
