import React from 'react';
import { storiesOf } from '@storybook/react';
import Table24 from '../../../es/table/24.js';

storiesOf('Table24', module)
  .add('default', () => <Table24 />)
  .add('with accessibility label', () => (
    <Table24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Table24 aria-label="Icon label">
      <title>Icon title</title>
    </Table24>
  ));
