import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceAdd32 from '../../../lib/FaceAdd/32';

storiesOf('FaceAdd32', module)
  .add('default', () => <FaceAdd32 />)
  .add('with accessibility label', () => (
    <FaceAdd32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceAdd32 focusable>
      <title>Icon title</title>
    </FaceAdd32>
  ));
