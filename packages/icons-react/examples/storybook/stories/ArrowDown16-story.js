import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDown16 from '../../../es/arrow--down/16.js';

storiesOf('ArrowDown16', module)
  .add('default', () => <ArrowDown16 />)
  .add('with accessibility label', () => (
    <ArrowDown16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDown16 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDown16>
  ));
