import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_020 from '../../../es/number--0/20.js';

storiesOf('Number_020', module)
  .add('default', () => <Number_020 />)
  .add('with accessibility label', () => (
    <Number_020 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_020 aria-label="Icon label">
      <title>Icon title</title>
    </Number_020>
  ));
