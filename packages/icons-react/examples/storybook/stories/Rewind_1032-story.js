import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_1032 from '../../../es/rewind--10/32.js';

storiesOf('Rewind_1032', module)
  .add('default', () => <Rewind_1032 />)
  .add('with accessibility label', () => (
    <Rewind_1032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_1032 aria-label="Icon label">
      <title>Icon title</title>
    </Rewind_1032>
  ));
