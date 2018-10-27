import React from 'react';
import { storiesOf } from '@storybook/react';
import DataBase32 from '../../../lib/data--base/32';

storiesOf('DataBase32', module)
  .add('default', () => <DataBase32 />)
  .add('with accessibility label', () => (
    <DataBase32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <DataBase32 focusable>
      <title>Icon title</title>
    </DataBase32>
  ));
