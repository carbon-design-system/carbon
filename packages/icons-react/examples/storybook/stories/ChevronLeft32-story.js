import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronLeft32 from '../../../es/chevron--left/32.js';

storiesOf('ChevronLeft32', module)
  .add('default', () => <ChevronLeft32 />)
  .add('with accessibility label', () => (
    <ChevronLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronLeft32 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronLeft32>
  ));
