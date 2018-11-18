import React from 'react';
import { storiesOf } from '@storybook/react';
import DataStructured32 from '../../../es/data--structured/32.js';

storiesOf('DataStructured32', module)
  .add('default', () => <DataStructured32 />)
  .add('with accessibility label', () => (
    <DataStructured32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataStructured32 aria-label="Icon label">
      <title>Icon title</title>
    </DataStructured32>
  ));
