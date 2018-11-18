import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowRight32 from '../../../es/arrow--right/32.js';

storiesOf('ArrowRight32', module)
  .add('default', () => <ArrowRight32 />)
  .add('with accessibility label', () => (
    <ArrowRight32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowRight32 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowRight32>
  ));
