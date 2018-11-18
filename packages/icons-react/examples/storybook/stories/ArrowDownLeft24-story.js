import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDownLeft24 from '../../../es/arrow--down-left/24.js';

storiesOf('ArrowDownLeft24', module)
  .add('default', () => <ArrowDownLeft24 />)
  .add('with accessibility label', () => (
    <ArrowDownLeft24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDownLeft24 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDownLeft24>
  ));
