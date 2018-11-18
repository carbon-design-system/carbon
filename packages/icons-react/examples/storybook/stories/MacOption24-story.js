import React from 'react';
import { storiesOf } from '@storybook/react';
import MacOption24 from '../../../es/mac--option/24.js';

storiesOf('MacOption24', module)
  .add('default', () => <MacOption24 />)
  .add('with accessibility label', () => (
    <MacOption24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacOption24 aria-label="Icon label">
      <title>Icon title</title>
    </MacOption24>
  ));
