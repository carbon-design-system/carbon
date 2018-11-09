import React from 'react';
import { storiesOf } from '@storybook/react';
import Arrival32 from '../../../lib/Arrival/32';

storiesOf('Arrival32', module)
  .add('default', () => <Arrival32 />)
  .add('with accessibility label', () => (
    <Arrival32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Arrival32 focusable>
      <title>Icon title</title>
    </Arrival32>
  ));
