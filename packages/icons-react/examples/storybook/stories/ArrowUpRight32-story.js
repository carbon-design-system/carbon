import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUpRight32 from '../../../lib/ArrowUpRight/32';

storiesOf('ArrowUpRight32', module)
  .add('default', () => <ArrowUpRight32 />)
  .add('with accessibility label', () => (
    <ArrowUpRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUpRight32 focusable>
      <title>Icon title</title>
    </ArrowUpRight32>
  ));
