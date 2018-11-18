import React from 'react';
import { storiesOf } from '@storybook/react';
import DataBase24 from '../../../es/data--base/24.js';

storiesOf('DataBase24', module)
  .add('default', () => <DataBase24 />)
  .add('with accessibility label', () => (
    <DataBase24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataBase24 aria-label="Icon label">
      <title>Icon title</title>
    </DataBase24>
  ));
