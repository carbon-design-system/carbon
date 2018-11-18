import React from 'react';
import { storiesOf } from '@storybook/react';
import DataUnstructured20 from '../../../es/data--unstructured/20.js';

storiesOf('DataUnstructured20', module)
  .add('default', () => <DataUnstructured20 />)
  .add('with accessibility label', () => (
    <DataUnstructured20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataUnstructured20 aria-label="Icon label">
      <title>Icon title</title>
    </DataUnstructured20>
  ));
