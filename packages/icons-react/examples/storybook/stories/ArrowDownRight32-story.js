import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDownRight32 from '../../../lib/ArrowDownRight/32';

storiesOf('ArrowDownRight32', module)
  .add('default', () => <ArrowDownRight32 />)
  .add('with accessibility label', () => (
    <ArrowDownRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDownRight32 focusable>
      <title>Icon title</title>
    </ArrowDownRight32>
  ));
