import React from 'react';
import { storiesOf } from '@storybook/react';
import DataError20 from '../../../es/data--error/20.js';

storiesOf('DataError20', module)
  .add('default', () => <DataError20 />)
  .add('with accessibility label', () => (
    <DataError20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataError20 aria-label="Icon label">
      <title>Icon title</title>
    </DataError20>
  ));
