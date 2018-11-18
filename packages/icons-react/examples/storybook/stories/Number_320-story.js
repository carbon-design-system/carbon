import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_320 from '../../../es/number--3/20.js';

storiesOf('Number_320', module)
  .add('default', () => <Number_320 />)
  .add('with accessibility label', () => (
    <Number_320 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_320 aria-label="Icon label">
      <title>Icon title</title>
    </Number_320>
  ));
