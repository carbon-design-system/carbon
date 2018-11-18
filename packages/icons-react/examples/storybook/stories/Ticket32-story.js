import React from 'react';
import { storiesOf } from '@storybook/react';
import Ticket32 from '../../../es/ticket/32.js';

storiesOf('Ticket32', module)
  .add('default', () => <Ticket32 />)
  .add('with accessibility label', () => (
    <Ticket32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Ticket32 aria-label="Icon label">
      <title>Icon title</title>
    </Ticket32>
  ));
