import React from 'react';
import { storiesOf } from '@storybook/react';
import List20 from '../../../es/list/20.js';

storiesOf('List20', module)
  .add('default', () => <List20 />)
  .add('with accessibility label', () => (
    <List20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <List20 aria-label="Icon label">
      <title>Icon title</title>
    </List20>
  ));
