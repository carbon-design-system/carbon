import React from 'react';
import { storiesOf } from '@storybook/react';
import MacOption20 from '../../../es/mac--option/20.js';

storiesOf('MacOption20', module)
  .add('default', () => <MacOption20 />)
  .add('with accessibility label', () => (
    <MacOption20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacOption20 aria-label="Icon label">
      <title>Icon title</title>
    </MacOption20>
  ));
