import React from 'react';
import { storiesOf } from '@storybook/react';
import MacCommand20 from '../../../es/mac--command/20.js';

storiesOf('MacCommand20', module)
  .add('default', () => <MacCommand20 />)
  .add('with accessibility label', () => (
    <MacCommand20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <MacCommand20 aria-label="Icon label">
      <title>Icon title</title>
    </MacCommand20>
  ));
