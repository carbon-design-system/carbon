import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowsHorizontal24 from '../../../es/arrows--horizontal/24.js';

storiesOf('ArrowsHorizontal24', module)
  .add('default', () => <ArrowsHorizontal24 />)
  .add('with accessibility label', () => (
    <ArrowsHorizontal24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowsHorizontal24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowsHorizontal24>
  ));
