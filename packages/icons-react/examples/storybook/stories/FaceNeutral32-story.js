import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceNeutral32 from '../../../lib/FaceNeutral/32';

storiesOf('FaceNeutral32', module)
  .add('default', () => <FaceNeutral32 />)
  .add('with accessibility label', () => (
    <FaceNeutral32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceNeutral32 focusable>
      <title>Icon title</title>
    </FaceNeutral32>
  ));
