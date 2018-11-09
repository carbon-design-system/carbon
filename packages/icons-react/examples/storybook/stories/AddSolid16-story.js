import React from 'react';
import { storiesOf } from '@storybook/react';
import AddSolid16 from '../../../lib/AddSolid/16';

storiesOf('AddSolid16', module)
  .add('default', () => <AddSolid16 />)
  .add('with accessibility label', () => (
    <AddSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AddSolid16 focusable>
      <title>Icon title</title>
    </AddSolid16>
  ));
