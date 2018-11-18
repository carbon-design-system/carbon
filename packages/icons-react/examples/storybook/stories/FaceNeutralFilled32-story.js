import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceNeutralFilled32 from '../../../es/face--neutral--filled/32.js';

storiesOf('FaceNeutralFilled32', module)
  .add('default', () => <FaceNeutralFilled32 />)
  .add('with accessibility label', () => (
    <FaceNeutralFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceNeutralFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </FaceNeutralFilled32>
  ));
