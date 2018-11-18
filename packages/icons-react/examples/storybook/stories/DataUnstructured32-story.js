import React from 'react';
import { storiesOf } from '@storybook/react';
import DataUnstructured32 from '../../../es/data--unstructured/32.js';

storiesOf('DataUnstructured32', module)
  .add('default', () => <DataUnstructured32 />)
  .add('with accessibility label', () => (
    <DataUnstructured32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataUnstructured32 aria-label="Icon label">
      <title>Icon title</title>
    </DataUnstructured32>
  ));
