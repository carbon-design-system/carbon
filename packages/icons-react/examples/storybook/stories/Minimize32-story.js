import React from 'react';
import { storiesOf } from '@storybook/react';
import Minimize32 from '../../../lib/Minimize/32';

storiesOf('Minimize32', module)
  .add('default', () => <Minimize32 />)
  .add('with accessibility label', () => (
    <Minimize32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Minimize32 focusable>
      <title>Icon title</title>
    </Minimize32>
  ));
