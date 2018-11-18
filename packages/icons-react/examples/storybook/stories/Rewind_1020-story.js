import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_1020 from '../../../es/rewind--10/20.js';

storiesOf('Rewind_1020', module)
  .add('default', () => <Rewind_1020 />)
  .add('with accessibility label', () => (
    <Rewind_1020 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_1020 aria-label="Icon label">
      <title>Icon title</title>
    </Rewind_1020>
  ));
