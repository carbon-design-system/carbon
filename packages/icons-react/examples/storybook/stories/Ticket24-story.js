import React from 'react';
import { storiesOf } from '@storybook/react';
import Ticket24 from '../../../es/ticket/24.js';

storiesOf('Ticket24', module)
  .add('default', () => <Ticket24 />)
  .add('with accessibility label', () => (
    <Ticket24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Ticket24 aria-label="Icon label">
      <title>Icon title</title>
    </Ticket24>
  ));
