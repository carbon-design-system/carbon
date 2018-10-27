import React from 'react';
import { storiesOf } from '@storybook/react';
import DataSet32 from '../../../lib/data--set/32';

storiesOf('DataSet32', module)
  .add('default', () => <DataSet32 />)
  .add('with accessibility label', () => (
    <DataSet32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataSet32 focusable>
      <title>Icon title</title>
    </DataSet32>
  ));
