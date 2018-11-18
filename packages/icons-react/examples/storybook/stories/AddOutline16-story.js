import React from 'react';
import { storiesOf } from '@storybook/react';
import AddOutline16 from '../../../es/add--outline/16.js';

storiesOf('AddOutline16', module)
  .add('default', () => <AddOutline16 />)
  .add('with accessibility label', () => (
    <AddOutline16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AddOutline16 aria-label="Icon label">
      <title>Icon title</title>
    </AddOutline16>
  ));
