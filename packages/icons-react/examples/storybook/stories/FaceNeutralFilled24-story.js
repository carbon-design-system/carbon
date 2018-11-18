import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceNeutralFilled24 from '../../../es/face--neutral--filled/24.js';

storiesOf('FaceNeutralFilled24', module)
  .add('default', () => <FaceNeutralFilled24 />)
  .add('with accessibility label', () => (
    <FaceNeutralFilled24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceNeutralFilled24 aria-label="Icon label">
      <title>Icon title</title>
    </FaceNeutralFilled24>
  ));
