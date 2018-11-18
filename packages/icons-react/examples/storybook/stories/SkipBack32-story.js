import React from 'react';
import { storiesOf } from '@storybook/react';
import SkipBack32 from '../../../es/skip--back/32.js';

storiesOf('SkipBack32', module)
  .add('default', () => <SkipBack32 />)
  .add('with accessibility label', () => (
    <SkipBack32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SkipBack32 aria-label="Icon label">
      <title>Icon title</title>
    </SkipBack32>
  ));
