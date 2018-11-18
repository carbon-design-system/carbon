import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowLeft20 from '../../../es/arrow--left/20.js';

storiesOf('ArrowLeft20', module)
  .add('default', () => <ArrowLeft20 />)
  .add('with accessibility label', () => (
    <ArrowLeft20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowLeft20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowLeft20>
  ));
