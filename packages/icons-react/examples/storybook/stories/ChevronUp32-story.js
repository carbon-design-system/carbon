import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronUp32 from '../../../es/chevron--up/32.js';

storiesOf('ChevronUp32', module)
  .add('default', () => <ChevronUp32 />)
  .add('with accessibility label', () => (
    <ChevronUp32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronUp32 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronUp32>
  ));
