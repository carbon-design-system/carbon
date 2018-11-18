import React from 'react';
import { storiesOf } from '@storybook/react';
import Number_920 from '../../../es/number--9/20.js';

storiesOf('Number_920', module)
  .add('default', () => <Number_920 />)
  .add('with accessibility label', () => (
    <Number_920 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Number_920 aria-label="Icon label">
      <title>Icon title</title>
    </Number_920>
  ));
