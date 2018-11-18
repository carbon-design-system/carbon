import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronLeft24 from '../../../es/chevron--left/24.js';

storiesOf('ChevronLeft24', module)
  .add('default', () => <ChevronLeft24 />)
  .add('with accessibility label', () => (
    <ChevronLeft24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronLeft24 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronLeft24>
  ));
