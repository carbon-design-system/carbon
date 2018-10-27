import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowsHorizontal32 from '../../../lib/arrows--horizontal/32';

storiesOf('ArrowsHorizontal32', module)
  .add('default', () => <ArrowsHorizontal32 />)
  .add('with accessibility label', () => (
    <ArrowsHorizontal32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowsHorizontal32 focusable>
      <title>Icon title</title>
    </ArrowsHorizontal32>
  ));
