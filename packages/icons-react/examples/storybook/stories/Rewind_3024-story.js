import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_3024 from '../../../es/rewind--30/24.js';

storiesOf('Rewind_3024', module)
  .add('default', () => <Rewind_3024 />)
  .add('with accessibility label', () => (
    <Rewind_3024 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_3024 aria-label="Icon label">
      <title>Icon title</title>
    </Rewind_3024>
  ));
