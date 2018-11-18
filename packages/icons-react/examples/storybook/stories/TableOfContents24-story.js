import React from 'react';
import { storiesOf } from '@storybook/react';
import TableOfContents24 from '../../../es/table-of-contents/24.js';

storiesOf('TableOfContents24', module)
  .add('default', () => <TableOfContents24 />)
  .add('with accessibility label', () => (
    <TableOfContents24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TableOfContents24 aria-label="Icon label">
      <title>Icon title</title>
    </TableOfContents24>
  ));
