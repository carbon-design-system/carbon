import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceNeutralFilled20 from '../../../es/face--neutral--filled/20.js';

storiesOf('FaceNeutralFilled20', module)
  .add('default', () => <FaceNeutralFilled20 />)
  .add('with accessibility label', () => (
    <FaceNeutralFilled20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceNeutralFilled20 aria-label="Icon label">
      <title>Icon title</title>
    </FaceNeutralFilled20>
  ));
