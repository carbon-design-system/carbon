import React from 'react';
import { storiesOf } from '@storybook/react';
import TableOfContents32 from '../../../lib/table-of-contents/32';

storiesOf('TableOfContents32', module)
  .add('default', () => <TableOfContents32 />)
  .add('with accessibility label', () => (
    <TableOfContents32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TableOfContents32 focusable>
      <title>Icon title</title>
    </TableOfContents32>
  ));
