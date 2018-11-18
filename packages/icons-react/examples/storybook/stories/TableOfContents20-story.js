import React from 'react';
import { storiesOf } from '@storybook/react';
import TableOfContents20 from '../../../es/table-of-contents/20.js';

storiesOf('TableOfContents20', module)
  .add('default', () => <TableOfContents20 />)
  .add('with accessibility label', () => (
    <TableOfContents20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TableOfContents20 aria-label="Icon label">
      <title>Icon title</title>
    </TableOfContents20>
  ));
