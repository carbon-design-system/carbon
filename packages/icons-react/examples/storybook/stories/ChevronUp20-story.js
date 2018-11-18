import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronUp20 from '../../../es/chevron--up/20.js';

storiesOf('ChevronUp20', module)
  .add('default', () => <ChevronUp20 />)
  .add('with accessibility label', () => (
    <ChevronUp20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronUp20 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronUp20>
  ));
