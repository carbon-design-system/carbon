import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_924 from '../../../es/number--9/24.js';

storiesOf('Number_924', module)
  .add('default', () => <Number_924 />)
  .add('with accessibility label', () => (
    <Number_924 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_924 aria-label="Icon label">
      <title>Icon title</title>
    </Number_924>
  ));
