import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDownLeft32 from '../../../lib/arrow--down-left/32';

storiesOf('ArrowDownLeft32', module)
  .add('default', () => <ArrowDownLeft32 />)
  .add('with accessibility label', () => (
    <ArrowDownLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDownLeft32 focusable>
      <title>Icon title</title>
    </ArrowDownLeft32>
  ));
