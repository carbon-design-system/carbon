import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowUp16 from '../../../es/arrow--up/16.js';

storiesOf('ArrowUp16', module)
  .add('default', () => <ArrowUp16 />)
  .add('with accessibility label', () => (
    <ArrowUp16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowUp16 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowUp16>
  ));
