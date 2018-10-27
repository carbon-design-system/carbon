import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronLeft32 from '../../../lib/chevron--left/32';

storiesOf('ChevronLeft32', module)
  .add('default', () => <ChevronLeft32 />)
  .add('with accessibility label', () => (
    <ChevronLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronLeft32 focusable>
      <title>Icon title</title>
    </ChevronLeft32>
  ));
