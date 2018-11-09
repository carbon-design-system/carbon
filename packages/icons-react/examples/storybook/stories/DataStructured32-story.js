import React from 'react';
import { storiesOf } from '@storybook/react';
import DataStructured32 from '../../../lib/DataStructured/32';

storiesOf('DataStructured32', module)
  .add('default', () => <DataStructured32 />)
  .add('with accessibility label', () => (
    <DataStructured32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataStructured32 focusable>
      <title>Icon title</title>
    </DataStructured32>
  ));
