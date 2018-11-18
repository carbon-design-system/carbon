import React from 'react';
import { storiesOf } from '@storybook/react';
import TableOfContents32 from '../../../es/table-of-contents/32.js';

storiesOf('TableOfContents32', module)
  .add('default', () => <TableOfContents32 />)
  .add('with accessibility label', () => (
    <TableOfContents32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TableOfContents32 aria-label="Icon label">
      <title>Icon title</title>
    </TableOfContents32>
  ));
