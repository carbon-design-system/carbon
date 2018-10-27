import React from 'react';
import { storiesOf } from '@storybook/react';
import Play32 from '../../../lib/play/32';

storiesOf('Play32', module)
  .add('default', () => <Play32 />)
  .add('with accessibility label', () => (
    <Play32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Play32 focusable>
      <title>Icon title</title>
    </Play32>
  ));
