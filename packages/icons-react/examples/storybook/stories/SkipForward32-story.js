import React from 'react';
import { storiesOf } from '@storybook/react';
import SkipForward32 from '../../../es/skip--forward/32.js';

storiesOf('SkipForward32', module)
  .add('default', () => <SkipForward32 />)
  .add('with accessibility label', () => (
    <SkipForward32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SkipForward32 aria-label="Icon label">
      <title>Icon title</title>
    </SkipForward32>
  ));
