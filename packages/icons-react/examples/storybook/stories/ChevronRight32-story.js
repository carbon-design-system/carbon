import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronRight32 from '../../../es/chevron--right/32.js';

storiesOf('ChevronRight32', module)
  .add('default', () => <ChevronRight32 />)
  .add('with accessibility label', () => (
    <ChevronRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronRight32 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronRight32>
  ));
