import React from 'react';
import { storiesOf } from '@storybook/react';
import Flow24 from '../../../es/flow/24.js';

storiesOf('Flow24', module)
  .add('default', () => <Flow24 />)
  .add('with accessibility label', () => (
    <Flow24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Flow24 aria-label="Icon label">
      <title>Icon title</title>
    </Flow24>
  ));
