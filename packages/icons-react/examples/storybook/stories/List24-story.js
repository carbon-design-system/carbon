import React from 'react';
import { storiesOf } from '@storybook/react';
import List24 from '../../../es/list/24.js';

storiesOf('List24', module)
  .add('default', () => <List24 />)
  .add('with accessibility label', () => (
    <List24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <List24 aria-label="Icon label">
      <title>Icon title</title>
    </List24>
  ));
