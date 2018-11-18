import React from 'react';
import { storiesOf } from '@storybook/react';
import AddAlt20 from '../../../es/add--alt/20.js';

storiesOf('AddAlt20', module)
  .add('default', () => <AddAlt20 />)
  .add('with accessibility label', () => (
    <AddAlt20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <AddAlt20 aria-label="Icon label">
      <title>Icon title</title>
    </AddAlt20>
  ));
