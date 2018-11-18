import React from 'react';
import { storiesOf } from '@storybook/react';
import TableSplit20 from '../../../es/table--split/20.js';

storiesOf('TableSplit20', module)
  .add('default', () => <TableSplit20 />)
  .add('with accessibility label', () => (
    <TableSplit20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TableSplit20 aria-label="Icon label">
      <title>Icon title</title>
    </TableSplit20>
  ));
