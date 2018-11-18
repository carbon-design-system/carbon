import React from 'react';
import { storiesOf } from '@storybook/react';
import Time24 from '../../../es/time/24.js';

storiesOf('Time24', module)
  .add('default', () => <Time24 />)
  .add('with accessibility label', () => (
    <Time24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Time24 aria-label="Icon label">
      <title>Icon title</title>
    </Time24>
  ));
