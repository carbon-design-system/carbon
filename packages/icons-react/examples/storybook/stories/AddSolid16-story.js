import React from 'react';
import { storiesOf } from '@storybook/react';
import AddSolid16 from '../../../es/add--solid/16.js';

storiesOf('AddSolid16', module)
  .add('default', () => <AddSolid16 />)
  .add('with accessibility label', () => (
    <AddSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AddSolid16 aria-label="Icon label">
      <title>Icon title</title>
    </AddSolid16>
  ));
