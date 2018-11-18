import React from 'react';
import { storiesOf } from '@storybook/react';
import ListBulleted16 from '../../../es/list--bulleted/16.js';

storiesOf('ListBulleted16', module)
  .add('default', () => <ListBulleted16 />)
  .add('with accessibility label', () => (
    <ListBulleted16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <ListBulleted16 aria-label="Icon label">
      <title>Icon title</title>
    </ListBulleted16>
  ));
