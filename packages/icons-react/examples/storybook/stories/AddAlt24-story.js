import React from 'react';
import { storiesOf } from '@storybook/react';
import AddAlt24 from '../../../es/add--alt/24.js';

storiesOf('AddAlt24', module)
  .add('default', () => <AddAlt24 />)
  .add('with accessibility label', () => (
    <AddAlt24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AddAlt24 aria-label="Icon label">
      <title>Icon title</title>
    </AddAlt24>
  ));
