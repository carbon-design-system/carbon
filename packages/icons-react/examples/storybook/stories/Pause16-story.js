import React from 'react';
import { storiesOf } from '@storybook/react';
import Pause16 from '../../../lib/Pause/16';

storiesOf('Pause16', module)
  .add('default', () => <Pause16 />)
  .add('with accessibility label', () => (
    <Pause16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Pause16 focusable>
      <title>Icon title</title>
    </Pause16>
  ));
