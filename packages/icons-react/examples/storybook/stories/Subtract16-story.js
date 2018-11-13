import React from 'react';
import { storiesOf } from '@storybook/react';
import Subtract16 from '../../../lib/Subtract/16';

storiesOf('Subtract16', module)
  .add('default', () => <Subtract16 />)
  .add('with accessibility label', () => (
    <Subtract16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Subtract16 focusable>
      <title>Icon title</title>
    </Subtract16>
  ));
