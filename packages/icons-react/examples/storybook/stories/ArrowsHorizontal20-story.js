import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowsHorizontal20 from '../../../es/arrows--horizontal/20.js';

storiesOf('ArrowsHorizontal20', module)
  .add('default', () => <ArrowsHorizontal20 />)
  .add('with accessibility label', () => (
    <ArrowsHorizontal20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowsHorizontal20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowsHorizontal20>
  ));
