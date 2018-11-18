import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowLeft24 from '../../../es/arrow--left/24.js';

storiesOf('ArrowLeft24', module)
  .add('default', () => <ArrowLeft24 />)
  .add('with accessibility label', () => (
    <ArrowLeft24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowLeft24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowLeft24>
  ));
