import React from 'react';
import { storiesOf } from '@storybook/react';
import Ticket20 from '../../../es/ticket/20.js';

storiesOf('Ticket20', module)
  .add('default', () => <Ticket20 />)
  .add('with accessibility label', () => (
    <Ticket20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Ticket20 aria-label="Icon label">
      <title>Icon title</title>
    </Ticket20>
  ));
