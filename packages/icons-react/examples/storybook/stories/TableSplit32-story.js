import React from 'react';
import { storiesOf } from '@storybook/react';
import TableSplit32 from '../../../es/table--split/32.js';

storiesOf('TableSplit32', module)
  .add('default', () => <TableSplit32 />)
  .add('with accessibility label', () => (
    <TableSplit32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TableSplit32 aria-label="Icon label">
      <title>Icon title</title>
    </TableSplit32>
  ));
