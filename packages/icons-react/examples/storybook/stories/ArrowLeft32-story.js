import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowLeft32 from '../../../es/arrow--left/32.js';

storiesOf('ArrowLeft32', module)
  .add('default', () => <ArrowLeft32 />)
  .add('with accessibility label', () => (
    <ArrowLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowLeft32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowLeft32>
  ));
