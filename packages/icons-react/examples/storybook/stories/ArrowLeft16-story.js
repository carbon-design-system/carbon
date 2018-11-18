import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowLeft16 from '../../../es/arrow--left/16.js';

storiesOf('ArrowLeft16', module)
  .add('default', () => <ArrowLeft16 />)
  .add('with accessibility label', () => (
    <ArrowLeft16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowLeft16 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowLeft16>
  ));
