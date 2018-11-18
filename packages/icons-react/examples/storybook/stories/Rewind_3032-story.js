import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_3032 from '../../../es/rewind--30/32.js';

storiesOf('Rewind_3032', module)
  .add('default', () => <Rewind_3032 />)
  .add('with accessibility label', () => (
    <Rewind_3032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_3032 aria-label="Icon label">
      <title>Icon title</title>
    </Rewind_3032>
  ));
