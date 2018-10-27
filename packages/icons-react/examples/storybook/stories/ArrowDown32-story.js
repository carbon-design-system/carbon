import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDown32 from '../../../lib/arrow--down/32';

storiesOf('ArrowDown32', module)
  .add('default', () => <ArrowDown32 />)
  .add('with accessibility label', () => (
    <ArrowDown32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDown32 focusable>
      <title>Icon title</title>
    </ArrowDown32>
  ));
