import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUp32 from '../../../lib/ArrowUp/32';

storiesOf('ArrowUp32', module)
  .add('default', () => <ArrowUp32 />)
  .add('with accessibility label', () => (
    <ArrowUp32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUp32 focusable>
      <title>Icon title</title>
    </ArrowUp32>
  ));
