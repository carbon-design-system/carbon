import React from 'react';
import { storiesOf } from '@storybook/react';
import DataBase20 from '../../../es/data--base/20.js';

storiesOf('DataBase20', module)
  .add('default', () => <DataBase20 />)
  .add('with accessibility label', () => (
    <DataBase20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataBase20 aria-label="Icon label">
      <title>Icon title</title>
    </DataBase20>
  ));
