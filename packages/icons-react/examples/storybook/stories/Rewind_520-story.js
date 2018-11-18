import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_520 from '../../../es/rewind--5/20.js';

storiesOf('Rewind_520', module)
  .add('default', () => <Rewind_520 />)
  .add('with accessibility label', () => (
    <Rewind_520 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_520 aria-label="Icon label">
      <title>Icon title</title>
    </Rewind_520>
  ));
