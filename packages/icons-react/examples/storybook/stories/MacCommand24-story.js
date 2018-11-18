import React from 'react';
import { storiesOf } from '@storybook/react';
import MacCommand24 from '../../../es/mac--command/24.js';

storiesOf('MacCommand24', module)
  .add('default', () => <MacCommand24 />)
  .add('with accessibility label', () => (
    <MacCommand24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacCommand24 aria-label="Icon label">
      <title>Icon title</title>
    </MacCommand24>
  ));
