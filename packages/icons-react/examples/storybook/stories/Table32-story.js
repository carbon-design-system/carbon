import React from 'react';
import { storiesOf } from '@storybook/react';
import Table32 from '../../../es/table/32.js';

storiesOf('Table32', module)
  .add('default', () => <Table32 />)
  .add('with accessibility label', () => (
    <Table32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Table32 aria-label="Icon label">
      <title>Icon title</title>
    </Table32>
  ));
