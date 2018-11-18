import React from 'react';
import { storiesOf } from '@storybook/react';
import Task20 from '../../../es/task/20.js';

storiesOf('Task20', module)
  .add('default', () => <Task20 />)
  .add('with accessibility label', () => (
    <Task20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Task20 aria-label="Icon label">
      <title>Icon title</title>
    </Task20>
  ));
