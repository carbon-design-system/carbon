import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_1032 from '../../../lib/Rewind_10/32';

storiesOf('Rewind_1032', module)
  .add('default', () => <Rewind_1032 />)
  .add('with accessibility label', () => (
    <Rewind_1032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_1032 focusable>
      <title>Icon title</title>
    </Rewind_1032>
  ));
