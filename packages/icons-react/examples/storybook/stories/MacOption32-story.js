import React from 'react';
import { storiesOf } from '@storybook/react';
import MacOption32 from '../../../es/mac--option/32.js';

storiesOf('MacOption32', module)
  .add('default', () => <MacOption32 />)
  .add('with accessibility label', () => (
    <MacOption32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacOption32 aria-label="Icon label">
      <title>Icon title</title>
    </MacOption32>
  ));
