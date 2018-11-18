import React from 'react';
import { storiesOf } from '@storybook/react';
import Light32 from '../../../es/light/32.js';

storiesOf('Light32', module)
  .add('default', () => <Light32 />)
  .add('with accessibility label', () => (
    <Light32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Light32 aria-label="Icon label">
      <title>Icon title</title>
    </Light32>
  ));
