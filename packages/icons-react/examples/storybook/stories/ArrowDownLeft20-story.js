import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDownLeft20 from '../../../es/arrow--down-left/20.js';

storiesOf('ArrowDownLeft20', module)
  .add('default', () => <ArrowDownLeft20 />)
  .add('with accessibility label', () => (
    <ArrowDownLeft20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDownLeft20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDownLeft20>
  ));
