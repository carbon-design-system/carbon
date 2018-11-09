import React from 'react';
import { storiesOf } from '@storybook/react';
import Subtract32 from '../../../lib/Subtract/32';

storiesOf('Subtract32', module)
  .add('default', () => <Subtract32 />)
  .add('with accessibility label', () => (
    <Subtract32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Subtract32 focusable>
      <title>Icon title</title>
    </Subtract32>
  ));
