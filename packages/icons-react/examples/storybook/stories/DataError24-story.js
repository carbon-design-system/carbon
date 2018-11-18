import React from 'react';
import { storiesOf } from '@storybook/react';
import DataError24 from '../../../es/data--error/24.js';

storiesOf('DataError24', module)
  .add('default', () => <DataError24 />)
  .add('with accessibility label', () => (
    <DataError24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataError24 aria-label="Icon label">
      <title>Icon title</title>
    </DataError24>
  ));
