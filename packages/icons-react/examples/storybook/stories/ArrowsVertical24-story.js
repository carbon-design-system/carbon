import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowsVertical24 from '../../../es/arrows--vertical/24.js';

storiesOf('ArrowsVertical24', module)
  .add('default', () => <ArrowsVertical24 />)
  .add('with accessibility label', () => (
    <ArrowsVertical24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowsVertical24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowsVertical24>
  ));
