import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowRight32 from '../../../lib/ArrowRight/32';

storiesOf('ArrowRight32', module)
  .add('default', () => <ArrowRight32 />)
  .add('with accessibility label', () => (
    <ArrowRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowRight32 focusable>
      <title>Icon title</title>
    </ArrowRight32>
  ));
