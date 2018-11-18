import React from 'react';
import { storiesOf } from '@storybook/react';
import DataBase32 from '../../../es/data--base/32.js';

storiesOf('DataBase32', module)
  .add('default', () => <DataBase32 />)
  .add('with accessibility label', () => (
    <DataBase32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataBase32 aria-label="Icon label">
      <title>Icon title</title>
    </DataBase32>
  ));
