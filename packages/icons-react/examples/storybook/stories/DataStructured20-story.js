import React from 'react';
import { storiesOf } from '@storybook/react';
import DataStructured20 from '../../../es/data--structured/20.js';

storiesOf('DataStructured20', module)
  .add('default', () => <DataStructured20 />)
  .add('with accessibility label', () => (
    <DataStructured20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataStructured20 aria-label="Icon label">
      <title>Icon title</title>
    </DataStructured20>
  ));
