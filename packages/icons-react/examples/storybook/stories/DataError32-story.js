import React from 'react';
import { storiesOf } from '@storybook/react';
import DataError32 from '../../../es/data--error/32.js';

storiesOf('DataError32', module)
  .add('default', () => <DataError32 />)
  .add('with accessibility label', () => (
    <DataError32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataError32 aria-label="Icon label">
      <title>Icon title</title>
    </DataError32>
  ));
