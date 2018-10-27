import React from 'react';
import { storiesOf } from '@storybook/react';
import Ticket32 from '../../../lib/ticket/32';

storiesOf('Ticket32', module)
  .add('default', () => <Ticket32 />)
  .add('with accessibility label', () => (
    <Ticket32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Ticket32 focusable>
      <title>Icon title</title>
    </Ticket32>
  ));
