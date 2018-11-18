import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUpRight32 from '../../../es/arrow--up-right/32.js';

storiesOf('ArrowUpRight32', module)
  .add('default', () => <ArrowUpRight32 />)
  .add('with accessibility label', () => (
    <ArrowUpRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUpRight32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUpRight32>
  ));
