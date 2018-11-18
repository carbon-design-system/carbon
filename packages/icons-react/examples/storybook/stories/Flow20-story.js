import React from 'react';
import { storiesOf } from '@storybook/react';
import Flow20 from '../../../es/flow/20.js';

storiesOf('Flow20', module)
  .add('default', () => <Flow20 />)
  .add('with accessibility label', () => (
    <Flow20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Flow20 aria-label="Icon label">
      <title>Icon title</title>
    </Flow20>
  ));
