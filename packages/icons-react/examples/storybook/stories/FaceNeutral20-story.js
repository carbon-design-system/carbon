import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceNeutral20 from '../../../es/face--neutral/20.js';

storiesOf('FaceNeutral20', module)
  .add('default', () => <FaceNeutral20 />)
  .add('with accessibility label', () => (
    <FaceNeutral20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceNeutral20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceNeutral20>
  ));
