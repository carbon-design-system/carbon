import React from 'react';
import { storiesOf } from '@storybook/react';
import TableSplit32 from '../../../lib/TableSplit/32';

storiesOf('TableSplit32', module)
  .add('default', () => <TableSplit32 />)
  .add('with accessibility label', () => (
    <TableSplit32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TableSplit32 focusable>
      <title>Icon title</title>
    </TableSplit32>
  ));
