import React from 'react';
import { storiesOf } from '@storybook/react';
import Asleep16 from '../../../lib/Asleep/16';

storiesOf('Asleep16', module)
  .add('default', () => <Asleep16 />)
  .add('with accessibility label', () => (
    <Asleep16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Asleep16 focusable>
      <title>Icon title</title>
    </Asleep16>
  ));
