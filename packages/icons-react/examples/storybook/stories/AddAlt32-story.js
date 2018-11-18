import React from 'react';
import { storiesOf } from '@storybook/react';
import AddAlt32 from '../../../es/add--alt/32.js';

storiesOf('AddAlt32', module)
  .add('default', () => <AddAlt32 />)
  .add('with accessibility label', () => (
    <AddAlt32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AddAlt32 aria-label="Icon label">
      <title>Icon title</title>
    </AddAlt32>
  ));
