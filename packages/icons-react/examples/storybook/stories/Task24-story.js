import React from 'react';
import { storiesOf } from '@storybook/react';
import Task24 from '../../../es/task/24.js';

storiesOf('Task24', module)
  .add('default', () => <Task24 />)
  .add('with accessibility label', () => (
    <Task24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Task24 aria-label="Icon label">
      <title>Icon title</title>
    </Task24>
  ));
