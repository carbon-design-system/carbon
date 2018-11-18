import React from 'react';
import { storiesOf } from '@storybook/react';
import TableSplit24 from '../../../es/table--split/24.js';

storiesOf('TableSplit24', module)
  .add('default', () => <TableSplit24 />)
  .add('with accessibility label', () => (
    <TableSplit24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TableSplit24 aria-label="Icon label">
      <title>Icon title</title>
    </TableSplit24>
  ));
