import React from 'react';
import { storiesOf } from '@storybook/react';
import FaceWink32 from '../../../lib/FaceWink/32';

storiesOf('FaceWink32', module)
  .add('default', () => <FaceWink32 />)
  .add('with accessibility label', () => (
    <FaceWink32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <FaceWink32 focusable>
      <title>Icon title</title>
    </FaceWink32>
  ));
