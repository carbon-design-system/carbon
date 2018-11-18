import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowRight20 from '../../../es/arrow--right/20.js';

storiesOf('ArrowRight20', module)
  .add('default', () => <ArrowRight20 />)
  .add('with accessibility label', () => (
    <ArrowRight20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowRight20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowRight20>
  ));
