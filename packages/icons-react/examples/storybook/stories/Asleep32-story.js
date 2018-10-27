import React from 'react';
import { storiesOf } from '@storybook/react';
import Asleep32 from '../../../lib/asleep/32';

storiesOf('Asleep32', module)
  .add('default', () => <Asleep32 />)
  .add('with accessibility label', () => (
    <Asleep32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Asleep32 focusable>
      <title>Icon title</title>
    </Asleep32>
  ));
