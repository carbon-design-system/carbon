import React from 'react';
import { storiesOf } from '@storybook/react';
import Table20 from '../../../es/table/20.js';

storiesOf('Table20', module)
  .add('default', () => <Table20 />)
  .add('with accessibility label', () => (
    <Table20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Table20 aria-label="Icon label">
      <title>Icon title</title>
    </Table20>
  ));
