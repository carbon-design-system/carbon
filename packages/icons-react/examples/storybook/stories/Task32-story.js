import React from 'react';
import { storiesOf } from '@storybook/react';
import Task32 from '../../../es/task/32.js';

storiesOf('Task32', module)
  .add('default', () => <Task32 />)
  .add('with accessibility label', () => (
    <Task32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Task32 aria-label="Icon label">
      <title>Icon title</title>
    </Task32>
  ));
