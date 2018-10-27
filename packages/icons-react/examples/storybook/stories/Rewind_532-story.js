import React from 'react';
import { storiesOf } from '@storybook/react';
import Rewind_532 from '../../../lib/rewind--5/32';

storiesOf('Rewind_532', module)
  .add('default', () => <Rewind_532 />)
  .add('with accessibility label', () => (
    <Rewind_532 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Rewind_532 focusable>
      <title>Icon title</title>
    </Rewind_532>
  ));
