import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_3020 from '../../../es/rewind--30/20.js';

storiesOf('Rewind_3020', module)
  .add('default', () => <Rewind_3020 />)
  .add('with accessibility label', () => (
    <Rewind_3020 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_3020 aria-label="Icon label">
      <title>Icon title</title>
    </Rewind_3020>
  ));
