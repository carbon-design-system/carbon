import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDownLeft32 from '../../../es/arrow--down-left/32.js';

storiesOf('ArrowDownLeft32', module)
  .add('default', () => <ArrowDownLeft32 />)
  .add('with accessibility label', () => (
    <ArrowDownLeft32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDownLeft32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDownLeft32>
  ));
