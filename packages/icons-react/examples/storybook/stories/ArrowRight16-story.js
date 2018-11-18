import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowRight16 from '../../../es/arrow--right/16.js';

storiesOf('ArrowRight16', module)
  .add('default', () => <ArrowRight16 />)
  .add('with accessibility label', () => (
    <ArrowRight16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowRight16 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowRight16>
  ));
