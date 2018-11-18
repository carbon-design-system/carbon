import React from 'react';
import { storiesOf } from '@storybook/react';
import ArrowDownRight20 from '../../../es/arrow--down-right/20.js';

storiesOf('ArrowDownRight20', module)
  .add('default', () => <ArrowDownRight20 />)
  .add('with accessibility label', () => (
    <ArrowDownRight20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ArrowDownRight20 aria-label="Icon label">
      <title>Icon title</title>
    </ArrowDownRight20>
  ));
