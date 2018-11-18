import React from 'react';
import { storiesOf } from '@storybook/react';
import ChevronDown20 from '../../../es/chevron--down/20.js';

storiesOf('ChevronDown20', module)
  .add('default', () => <ChevronDown20 />)
  .add('with accessibility label', () => (
    <ChevronDown20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ChevronDown20 aria-label="Icon label">
      <title>Icon title</title>
    </ChevronDown20>
  ));
