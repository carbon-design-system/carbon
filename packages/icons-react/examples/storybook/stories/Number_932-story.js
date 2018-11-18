import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_932 from '../../../es/number--9/32.js';

storiesOf('Number_932', module)
  .add('default', () => <Number_932 />)
  .add('with accessibility label', () => (
    <Number_932 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_932 aria-label="Icon label">
      <title>Icon title</title>
    </Number_932>
  ));
