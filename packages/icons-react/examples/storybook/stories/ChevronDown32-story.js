import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronDown32 from '../../../es/chevron--down/32.js';

storiesOf('ChevronDown32', module)
  .add('default', () => <ChevronDown32 />)
  .add('with accessibility label', () => (
    <ChevronDown32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronDown32 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronDown32>
  ));
