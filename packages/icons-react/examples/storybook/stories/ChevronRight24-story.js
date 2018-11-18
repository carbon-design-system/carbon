import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronRight24 from '../../../es/chevron--right/24.js';

storiesOf('ChevronRight24', module)
  .add('default', () => <ChevronRight24 />)
  .add('with accessibility label', () => (
    <ChevronRight24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronRight24 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronRight24>
  ));
