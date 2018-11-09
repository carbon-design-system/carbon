import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUpLeft32 from '../../../lib/ArrowUpLeft/32';

storiesOf('ArrowUpLeft32', module)
  .add('default', () => <ArrowUpLeft32 />)
  .add('with accessibility label', () => (
    <ArrowUpLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUpLeft32 focusable>
      <title>Icon title</title>
    </ArrowUpLeft32>
  ));
