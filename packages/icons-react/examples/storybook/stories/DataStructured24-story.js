import React from 'react';
import { storiesOf } from '@storybook/react';
import DataStructured24 from '../../../es/data--structured/24.js';

storiesOf('DataStructured24', module)
  .add('default', () => <DataStructured24 />)
  .add('with accessibility label', () => (
    <DataStructured24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataStructured24 aria-label="Icon label">
      <title>Icon title</title>
    </DataStructured24>
  ));
