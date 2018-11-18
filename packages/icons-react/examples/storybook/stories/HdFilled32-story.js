import React from 'react';
import { storiesOf } from '@storybook/react';
import HdFilled32 from '../../../es/HD--filled/32.js';

storiesOf('HdFilled32', module)
  .add('default', () => <HdFilled32 />)
  .add('with accessibility label', () => (
    <HdFilled32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <HdFilled32 aria-label="Icon label">
      <title>Icon title</title>
    </HdFilled32>
  ));
