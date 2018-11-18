import React from 'react';
import { storiesOf } from '@storybook/react';
import Flow32 from '../../../es/flow/32.js';

storiesOf('Flow32', module)
  .add('default', () => <Flow32 />)
  .add('with accessibility label', () => (
    <Flow32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Flow32 aria-label="Icon label">
      <title>Icon title</title>
    </Flow32>
  ));
