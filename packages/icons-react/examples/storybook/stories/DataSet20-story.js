import React from 'react';
import { storiesOf } from '@storybook/react';
import DataSet20 from '../../../es/data--set/20.js';

storiesOf('DataSet20', module)
  .add('default', () => <DataSet20 />)
  .add('with accessibility label', () => (
    <DataSet20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataSet20 aria-label="Icon label">
      <title>Icon title</title>
    </DataSet20>
  ));
