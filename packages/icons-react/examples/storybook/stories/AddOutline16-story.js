import React from 'react';
import { storiesOf } from '@storybook/react';
import AddOutline16 from '../../../lib/add--outline/16';

storiesOf('AddOutline16', module)
  .add('default', () => <AddOutline16 />)
  .add('with accessibility label', () => (
    <AddOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AddOutline16 focusable>
      <title>Icon title</title>
    </AddOutline16>
  ));
