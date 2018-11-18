import React from 'react';
import { storiesOf } from '@storybook/react';
import ListBulleted24 from '../../../es/list--bulleted/24.js';

storiesOf('ListBulleted24', module)
  .add('default', () => <ListBulleted24 />)
  .add('with accessibility label', () => (
    <ListBulleted24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListBulleted24 aria-label="Icon label">
      <title>Icon title</title>
    </ListBulleted24>
  ));
