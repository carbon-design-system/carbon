import React from 'react';
import { storiesOf } from '@storybook/react';
import DataError32 from '../../../lib/DataError/32';

storiesOf('DataError32', module)
  .add('default', () => <DataError32 />)
  .add('with accessibility label', () => (
    <DataError32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataError32 focusable>
      <title>Icon title</title>
    </DataError32>
  ));
