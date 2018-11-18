import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronLeft20 from '../../../es/chevron--left/20.js';

storiesOf('ChevronLeft20', module)
  .add('default', () => <ChevronLeft20 />)
  .add('with accessibility label', () => (
    <ChevronLeft20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronLeft20 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronLeft20>
  ));
