import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowsHorizontal32 from '../../../es/arrows--horizontal/32.js';

storiesOf('ArrowsHorizontal32', module)
  .add('default', () => <ArrowsHorizontal32 />)
  .add('with accessibility label', () => (
    <ArrowsHorizontal32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowsHorizontal32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowsHorizontal32>
  ));
