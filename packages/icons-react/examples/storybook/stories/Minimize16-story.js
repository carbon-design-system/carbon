import React from 'react';
import { storiesOf } from '@storybook/react';
import Minimize16 from '../../../lib/Minimize/16';

storiesOf('Minimize16', module)
  .add('default', () => <Minimize16 />)
  .add('with accessibility label', () => (
    <Minimize16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Minimize16 focusable>
      <title>Icon title</title>
    </Minimize16>
  ));
