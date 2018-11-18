import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_532 from '../../../es/rewind--5/32.js';

storiesOf('Rewind_532', module)
  .add('default', () => <Rewind_532 />)
  .add('with accessibility label', () => (
    <Rewind_532 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_532 aria-label="Icon label">
      <title>Icon title</title>
    </Rewind_532>
  ));
