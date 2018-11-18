import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_524 from '../../../es/rewind--5/24.js';

storiesOf('Rewind_524', module)
  .add('default', () => <Rewind_524 />)
  .add('with accessibility label', () => (
    <Rewind_524 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_524 aria-label="Icon label">
      <title>Icon title</title>
    </Rewind_524>
  ));
