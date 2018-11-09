import React from 'react';
import { storiesOf } from '@storybook/react';
import DataUnstructured32 from '../../../lib/DataUnstructured/32';

storiesOf('DataUnstructured32', module)
  .add('default', () => <DataUnstructured32 />)
  .add('with accessibility label', () => (
    <DataUnstructured32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataUnstructured32 focusable>
      <title>Icon title</title>
    </DataUnstructured32>
  ));
