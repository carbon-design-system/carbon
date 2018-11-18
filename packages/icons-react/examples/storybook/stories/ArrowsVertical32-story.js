import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowsVertical32 from '../../../es/arrows--vertical/32.js';

storiesOf('ArrowsVertical32', module)
  .add('default', () => <ArrowsVertical32 />)
  .add('with accessibility label', () => (
    <ArrowsVertical32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowsVertical32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowsVertical32>
  ));
