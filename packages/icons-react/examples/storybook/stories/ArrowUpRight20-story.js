import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUpRight20 from '../../../es/arrow--up-right/20.js';

storiesOf('ArrowUpRight20', module)
  .add('default', () => <ArrowUpRight20 />)
  .add('with accessibility label', () => (
    <ArrowUpRight20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUpRight20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUpRight20>
  ));
