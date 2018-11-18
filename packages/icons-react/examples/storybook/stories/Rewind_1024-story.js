import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_1024 from '../../../es/rewind--10/24.js';

storiesOf('Rewind_1024', module)
  .add('default', () => <Rewind_1024 />)
  .add('with accessibility label', () => (
    <Rewind_1024 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_1024 aria-label="Icon label">
      <title>Icon title</title>
    </Rewind_1024>
  ));
