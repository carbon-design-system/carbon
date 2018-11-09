import React from 'react';
import { storiesOf } from '@storybook/react';
import Task32 from '../../../lib/Task/32';

storiesOf('Task32', module)
  .add('default', () => <Task32 />)
  .add('with accessibility label', () => (
    <Task32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Task32 focusable>
      <title>Icon title</title>
    </Task32>
  ));
