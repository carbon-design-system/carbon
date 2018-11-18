import React from 'react';
import { storiesOf } from '@storybook/react';
import DataUnstructured24 from '../../../es/data--unstructured/24.js';

storiesOf('DataUnstructured24', module)
  .add('default', () => <DataUnstructured24 />)
  .add('with accessibility label', () => (
    <DataUnstructured24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataUnstructured24 aria-label="Icon label">
      <title>Icon title</title>
    </DataUnstructured24>
  ));
