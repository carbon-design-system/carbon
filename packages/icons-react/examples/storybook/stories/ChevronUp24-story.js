import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronUp24 from '../../../es/chevron--up/24.js';

storiesOf('ChevronUp24', module)
  .add('default', () => <ChevronUp24 />)
  .add('with accessibility label', () => (
    <ChevronUp24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronUp24 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronUp24>
  ));
