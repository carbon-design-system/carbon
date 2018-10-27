import React from 'react';
import { storiesOf } from '@storybook/react';
import SkipBack32 from '../../../lib/skip--back/32';

storiesOf('SkipBack32', module)
  .add('default', () => <SkipBack32 />)
  .add('with accessibility label', () => (
    <SkipBack32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <SkipBack32 focusable>
      <title>Icon title</title>
    </SkipBack32>
  ));
