import React from 'react';
import { storiesOf } from '@storybook/react';
import DataSet24 from '../../../es/data--set/24.js';

storiesOf('DataSet24', module)
  .add('default', () => <DataSet24 />)
  .add('with accessibility label', () => (
    <DataSet24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataSet24 aria-label="Icon label">
      <title>Icon title</title>
    </DataSet24>
  ));
