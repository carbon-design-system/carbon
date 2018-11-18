import React from 'react';
import { storiesOf } from '@storybook/react';
import SkipForward24 from '../../../es/skip--forward/24.js';

storiesOf('SkipForward24', module)
  .add('default', () => <SkipForward24 />)
  .add('with accessibility label', () => (
    <SkipForward24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SkipForward24 aria-label="Icon label">
      <title>Icon title</title>
    </SkipForward24>
  ));
